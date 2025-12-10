
  create table "public"."follows" (
    "created_at" timestamp with time zone not null default now(),
    "from" uuid not null default auth.uid(),
    "to" uuid not null
      );


alter table "public"."follows" enable row level security;

CREATE UNIQUE INDEX follows_pkey ON public.follows USING btree ("from", "to");

alter table "public"."follows" add constraint "follows_pkey" PRIMARY KEY using index "follows_pkey";

alter table "public"."follows" add constraint "follows_from_fkey" FOREIGN KEY ("from") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."follows" validate constraint "follows_from_fkey";

alter table "public"."follows" add constraint "follows_to_fkey" FOREIGN KEY ("to") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."follows" validate constraint "follows_to_fkey";

grant delete on table "public"."follows" to "anon";

grant insert on table "public"."follows" to "anon";

grant references on table "public"."follows" to "anon";

grant select on table "public"."follows" to "anon";

grant trigger on table "public"."follows" to "anon";

grant truncate on table "public"."follows" to "anon";

grant update on table "public"."follows" to "anon";

grant delete on table "public"."follows" to "authenticated";

grant insert on table "public"."follows" to "authenticated";

grant references on table "public"."follows" to "authenticated";

grant select on table "public"."follows" to "authenticated";

grant trigger on table "public"."follows" to "authenticated";

grant truncate on table "public"."follows" to "authenticated";

grant update on table "public"."follows" to "authenticated";

grant delete on table "public"."follows" to "postgres";

grant insert on table "public"."follows" to "postgres";

grant references on table "public"."follows" to "postgres";

grant select on table "public"."follows" to "postgres";

grant trigger on table "public"."follows" to "postgres";

grant truncate on table "public"."follows" to "postgres";

grant update on table "public"."follows" to "postgres";

grant delete on table "public"."follows" to "service_role";

grant insert on table "public"."follows" to "service_role";

grant references on table "public"."follows" to "service_role";

grant select on table "public"."follows" to "service_role";

grant trigger on table "public"."follows" to "service_role";

grant truncate on table "public"."follows" to "service_role";

grant update on table "public"."follows" to "service_role";


  create policy "Enable delete for users based on user_id"
  on "public"."follows"
  as permissive
  for delete
  to public
using ((( SELECT auth.uid() AS uid) = "from"));



  create policy "Enable insert for users based on user_id"
  on "public"."follows"
  as permissive
  for insert
  to public
with check ((( SELECT auth.uid() AS uid) = "from"));



  create policy "Enable read access for all users"
  on "public"."follows"
  as permissive
  for select
  to public
using (true);



  create policy "Enable insert for authenticated users only"
  on "public"."profiles"
  as permissive
  for insert
  to authenticated
with check (true);



