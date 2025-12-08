use std::net::{Ipv6Addr, SocketAddr, SocketAddrV6};

use axum::{
    Form, Json, Router,
    extract::State,
    http::StatusCode,
    response::Html,
    routing::{get, post},
};
use axum_extra::{
    TypedHeader,
    headers::{Authorization, authorization::Bearer},
};
use clap::{Args, Parser};
use color_eyre::{
    config::Theme,
    eyre::{self, Context, eyre},
};
use jiff::Timestamp;
use postgrest::Postgrest;
use serde::{Deserialize, Serialize};
use supabase_auth::models::{AuthClient, EmailSignUpResult, Session, User};
use tokio::{net::TcpListener, signal};
use tower::ServiceBuilder;
use tower_http::{
    catch_panic::CatchPanicLayer,
    services::ServeDir,
    trace::{DefaultMakeSpan, TraceLayer},
};
use tracing::{Level, instrument};
use tracing_error::ErrorLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod cli_level_filter;
mod error;

use cli_level_filter::CliLevelFilter;
use uuid::Uuid;
use vy::prelude::*;

use crate::error::WithStatusCode;

#[inline]
const fn default_listen_addr() -> SocketAddr {
    SocketAddr::V6(SocketAddrV6::new(Ipv6Addr::UNSPECIFIED, 3000, 0, 0))
}

#[derive(Parser, Deserialize)]
#[command(version, about, long_about = None)]
#[command(propagate_version = true)]
struct Cli {
    #[clap(short, long, env = "RUST_LOG")]
    #[serde(default)]
    log_level: CliLevelFilter,
    #[clap(short, long, env = "LISTEN_ADDR")]
    #[serde(default = "default_listen_addr")]
    addr: SocketAddr,
    #[clap(flatten)]
    #[serde(default)]
    supabase: SupabaseConfig,
}

#[derive(Args, Deserialize, Default)]
struct SupabaseConfig {
    #[clap(long = "supabase-url", env = "SUPABASE_URL")]
    project_url: String,
    #[clap(long = "supabase-api-key", env = "SUPABASE_API_KEY")]
    api_key: String,
    #[clap(long = "supabase-jwt-secret", env = "SUPABASE_JWT_SECRET")]
    jwt_secret: String,
}

impl Default for Cli {
    fn default() -> Self {
        Self {
            log_level: CliLevelFilter::default(),
            addr: default_listen_addr(),
            supabase: SupabaseConfig::default(),
        }
    }
}
#[derive(Clone)]
struct SoapboxState {
    auth_client: AuthClient,
    postgrest: Postgrest,
}

#[derive(Deserialize, Serialize)]
struct Thought {
    id: i64,
    created_at: jiff::Timestamp,
    user_id: Uuid,
    text_content: String,
    parent_thought: i64,
}

#[derive(Deserialize, Serialize)]
struct Profile {
    id: Uuid,
    created_at: jiff::Timestamp,
    last_edited: jiff::Timestamp,
    username: String,
    nickname: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    bio: Option<String>,
}

impl IntoHtml for Thought {
    fn into_html(self) -> impl IntoHtml {
        article!(h1!(self.user_id.to_string()), p!(self.text_content))
    }
}

impl SoapboxState {
    #[instrument(skip(self))]
    // TODO: Create an algorithm
    async fn get_feed_for_user(&self, user: User) -> eyre::Result<Vec<Thought>> {
        self.postgrest
            .from("thoughts_test")
            .select("*")
            .execute()
            .await
            .wrap_err_with(|| format!("Failed to get feed for user: {}", user.id))?
            .json()
            .await
            .wrap_err("Failed to get feed as JSON")
    }
}

#[tokio::main]
async fn main() -> eyre::Result<()> {
    let color = supports_color::on(supports_color::Stream::Stderr)
        .map(|c| c.has_basic)
        .unwrap_or_default();

    color_eyre::config::HookBuilder::default()
        .theme(if color {
            Theme::dark()
        } else {
            Theme::default()
        })
        .display_env_section(false)
        .install()?;

    let mut config = match std::fs::read_to_string("config.toml") {
        Ok(file) => toml::from_str(&file).wrap_err("Failed to deserialize config file")?,
        Err(e) => {
            eprintln!("Failed to open config file: {}", e);
            eprintln!("Using default config");
            Cli::default()
        }
    };
    config.update_from(std::env::args_os());

    tracing_subscriber::registry()
        .with(ErrorLayer::default())
        .with(config.log_level.0)
        .with(tracing_subscriber::fmt::layer().with_ansi(color))
        .init();

    let app = Router::new()
        .route("/api/feed", get(feed))
        .route("/api/new_user", post(new_user))
        .fallback_service(
            ServeDir::new("frontend/dist")
                .precompressed_gzip()
                .precompressed_br(),
        )
        .layer(
            ServiceBuilder::new()
                .layer(CatchPanicLayer::custom(error::PanicHandler))
                .layer(
                    TraceLayer::new_for_http()
                        .make_span_with(DefaultMakeSpan::new().level(Level::INFO)),
                ),
        )
        .with_state(SoapboxState {
            auth_client: AuthClient::new(
                config.supabase.project_url.clone(),
                config.supabase.api_key.clone(),
                config.supabase.jwt_secret,
            ),
            postgrest: Postgrest::new(format!("{}/rest/v1", config.supabase.project_url))
                .insert_header("apikey", config.supabase.api_key),
        });

    let listener = TcpListener::bind(config.addr)
        .await
        .wrap_err_with(|| format!("Failed to open listener on {}", config.addr))?;
    tracing::info!("Listening on {}", config.addr);
    axum::serve(listener, app.into_make_service())
        .with_graceful_shutdown(shutdown_signal())
        .await
        .wrap_err("Failed to serve make service")
}

#[instrument(skip_all)]
async fn feed(
    State(state): State<SoapboxState>,
    TypedHeader(authorization): TypedHeader<Authorization<Bearer>>,
) -> Result<Html<String>, error::Error> {
    let user = state
        .auth_client
        .get_user(authorization.token())
        .await
        .wrap_err("Couldn't find user with that token")
        .with_status_code(StatusCode::INTERNAL_SERVER_ERROR)?;

    let feed = state
        .get_feed_for_user(user)
        .await
        .wrap_err("Failed to get feed for user")
        .with_status_code(StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Html(feed.into_html().into_string()))
}

#[derive(Deserialize)]
struct NewUserForm {
    email: String,
    password: String,
    password_repeat: String,
    username: String,
    nickname: String,
}

#[instrument(skip_all)]
async fn new_user(
    State(state): State<SoapboxState>,
    Form(new_user_form): Form<NewUserForm>,
) -> Result<Json<Session>, error::Error> {
    if new_user_form.password != new_user_form.password_repeat {
        Err(eyre!("The passwords do not match")).with_status_code(StatusCode::BAD_REQUEST)?
    }
    let EmailSignUpResult::SessionResult(new_user) = state
        .auth_client
        .sign_up_with_email_and_password(
            &new_user_form.email,
            &new_user_form.password,
            Some(supabase_auth::models::SignUpWithPasswordOptions {
                email_redirect_to: Some("https://soapbox.lol/protected".to_owned()),
                data: None,
                captcha_token: None,
            }),
        )
        .await
        .wrap_err("Failed to create user with that email and password")
        .with_status_code(StatusCode::BAD_REQUEST)?
    else {
        Err(eyre!("Email confirmation should be turned off"))
            .with_status_code(StatusCode::BAD_REQUEST)?
    };

    let response = state
        .postgrest
        .from("profiles")
        .insert(
            serde_json::to_string(&[Profile {
                id: new_user.user.id,
                created_at: Timestamp::now(),
                last_edited: Timestamp::now(),
                username: new_user_form.username,
                nickname: new_user_form.nickname,
                bio: None,
            }])
            .wrap_err("Failed to serialize profile to JSON")
            .with_status_code(StatusCode::INTERNAL_SERVER_ERROR)?,
        )
        .execute()
        .await
        .wrap_err("Failed to add profile to profiles table")
        .with_status_code(StatusCode::INTERNAL_SERVER_ERROR)?;

    match response.error_for_status_ref() {
        Err(e) => {
            let error = response
                .text()
                .await
                .wrap_err("Failed to get text from insert query")
                .with_status_code(StatusCode::INTERNAL_SERVER_ERROR)?;

            let status_code = e.status().unwrap_or(StatusCode::INTERNAL_SERVER_ERROR);

            Err(eyre!(error))
                .wrap_err(e)
                .wrap_err("Failed to insert user into profiles")
                .with_status_code(status_code)?;
        }
        Ok(_) => {
            let _ = response
                .text()
                .await
                .wrap_err("Failed to get text from insert query")
                .with_status_code(StatusCode::INTERNAL_SERVER_ERROR)?;
        }
    }

    Ok(Json(new_user))
}

async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }
}
