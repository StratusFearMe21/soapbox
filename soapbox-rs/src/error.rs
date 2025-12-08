//! # yaaxum-error
//! Yet Another Axum Error Handler
//!
//! This crate uses `eyre` to capture the error,
//! the error is then returned to the browser or
//! whatever it is, it's then nicely formatted to
//! a webpage
use std::fmt::Debug;

use axum::{
    body::Body,
    http::StatusCode,
    response::{Html, IntoResponse},
};
use color_eyre::eyre::{self, eyre};
use tower_http::catch_panic::ResponseForPanic;
use tracing_error::SpanTrace;
use vy::{escape::escape_into, prelude::*};

pub type Result<T> = std::result::Result<T, Error>;

struct Escaper<'a>(&'a mut String);

impl std::fmt::Write for Escaper<'_> {
    fn write_str(&mut self, s: &str) -> std::fmt::Result {
        escape_into(self.0, s);
        Ok(())
    }
}

struct ColorEyreFormatter<'a>(&'a color_eyre::Handler);

impl IntoHtml for ColorEyreFormatter<'_> {
    #[inline]
    fn into_html(self) -> impl IntoHtml {
        self
    }

    fn escape_and_write(self, buf: &mut String)
    where
        Self: Sized,
    {
        self.0.span_trace().unwrap().with_spans(|span, fields| {
            details!(
                summary!(
                    code!(span.module_path().unwrap_or_default(), "::", span.name()),
                    if let Some((file, line)) = span.file().and_then(|f| Some((f, span.line()?))) {
                        (" at ", code!(file, ":", line))
                    }
                ),
                if !fields.is_empty() {
                    p!("with ", code!(fields))
                },
            )
            .escape_and_write(buf);
            true
        });
    }
}

struct ChainFormatter<'a>(eyre::Chain<'a>);

impl IntoHtml for ChainFormatter<'_> {
    #[inline]
    fn into_html(self) -> impl IntoHtml {
        self
    }

    fn escape_and_write(self, buf: &mut String)
    where
        Self: Sized,
    {
        for error in self.0 {
            buf.push_str("<li>");
            core::fmt::Write::write_fmt(&mut Escaper(buf), format_args!("{}", error)).unwrap();
            buf.push_str("</li>");
        }
    }

    fn size_hint(&self) -> usize {
        self.0.len() * "<li>Failed to</li>".len()
    }
}

pub struct Error(pub StatusCode, pub color_eyre::eyre::Report);

impl ToString for Error {
    fn to_string(&self) -> String {
        let handler: &color_eyre::Handler = self.1.handler().downcast_ref().unwrap();
        (
            h2!("Error"),
            ol!(ChainFormatter(self.1.chain())),
            h3!("Spantrace"),
            ColorEyreFormatter(handler),
        )
            .into_string()
    }
}

impl Debug for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        self.1.handler().debug(self.1.as_ref(), f)
    }
}

impl IntoResponse for Error {
    fn into_response(self) -> axum::response::Response {
        (self.0, Html(self.to_string())).into_response()
    }
}

impl From<Error> for Box<dyn std::error::Error + Sync + Send> {
    fn from(value: Error) -> Self {
        value.1.into()
    }
}

#[derive(Clone, Copy)]
pub struct PanicHandler;

impl ResponseForPanic for PanicHandler {
    type ResponseBody = Body;

    fn response_for_panic(
        &mut self,
        err: Box<dyn std::any::Any + Send + 'static>,
    ) -> axum::http::Response<Self::ResponseBody> {
        let error_string = if let Some(s) = err.downcast_ref::<String>() {
            tracing::error!("Service panicked: {}", s);
            s.as_str()
        } else if let Some(s) = err.downcast_ref::<&str>() {
            tracing::error!("Service panicked: {}", s);
            s
        } else {
            let s = "Service panicked but `CatchPanic` was unable to downcast the panic info";
            tracing::error!("{}", s);
            s
        };

        let span_trace = SpanTrace::capture();
        dbg!(span_trace);

        Error(StatusCode::INTERNAL_SERVER_ERROR, eyre!("{}", error_string)).into_response()
    }
}

pub trait WithStatusCode<T> {
    fn with_status_code(self, code: StatusCode) -> Result<T>;
}

impl<T> WithStatusCode<T> for std::result::Result<T, color_eyre::eyre::Report> {
    fn with_status_code(self, code: StatusCode) -> Result<T> {
        self.map_err(|e| Error(code, e))
    }
}
