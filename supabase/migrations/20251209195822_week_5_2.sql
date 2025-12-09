set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.like_count(thoughts_row public.thoughts_test)
 RETURNS bigint
 LANGUAGE sql
 STABLE
AS $function$
      SELECT count(*) FROM public.interactions_test WHERE thought_id = thoughts_row.id;
    $function$
;

CREATE OR REPLACE FUNCTION public.like_count_test(thoughts_row public.thoughts_test)
 RETURNS bigint
 LANGUAGE sql
 STABLE
AS $function$
      SELECT count(*) FROM public.interactions_test WHERE thought_id = thoughts_row.id;
    $function$
;

CREATE OR REPLACE FUNCTION public.reply_count(thoughts_row public.thoughts_test)
 RETURNS bigint
 LANGUAGE sql
 STABLE
AS $function$
      SELECT count(*) FROM public.thoughts_test WHERE parent_thought = thoughts_row.id;
    $function$
;

CREATE OR REPLACE FUNCTION public.thought_count(profiles_row public.profiles)
 RETURNS bigint
 LANGUAGE sql
 STABLE
AS $function$
      SELECT count(*) FROM public.thoughts_test WHERE user_id = profiles_row.id;
    $function$
;

CREATE OR REPLACE FUNCTION public.get_profile(username_input text)
 RETURNS record
 LANGUAGE plpgsql
AS $function$declare
profile RECORD;
BEGIN
SELECT * INTO profile FROM public.profiles as profiles
WHERE profiles.username = username_input;
return profile;
END$function$
;

CREATE OR REPLACE FUNCTION public.get_thought_like_count(thought_id_input integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$declare
like_count integer;
BEGIN
SELECT COUNT(*) INTO like_count
FROM public.interactions_test as interactions
WHERE interactions.thought_id = thought_id_input;
RETURN like_count;
END$function$
;

CREATE OR REPLACE FUNCTION public.get_thought_reply_count(thought_id_input integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$declare
reply_count integer;
BEGIN
SELECT COUNT(*) INTO reply_count
FROM public.thoughts_test as thoughts
WHERE thoughts.parent_thought = thought_id_input;
RETURN reply_count;
END$function$
;

CREATE OR REPLACE FUNCTION public.get_thoughts_count(username_input text)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$declare
thoughts_count int;
BEGIN
SELECT COUNT(*) INTO thoughts_count FROM public.thoughts_test as thoughts
INNER JOIN public.profiles as profiles ON profiles.id = thoughts.user_id
WHERE profiles.username = username_input;
return thoughts_count;
END$function$
;

CREATE OR REPLACE FUNCTION public.get_thoughts_for_user(username_input text)
 RETURNS SETOF record
 LANGUAGE plpgsql
AS $function$
declare
thoughts_set RECORD;
BEGIN
FOR thoughts_set IN SELECT *
FROM public.thoughts_test as thoughts
INNER JOIN public.profiles as profiles
ON profiles.id = thoughts.user_id
WHERE profiles.username = username_input
LOOP RETURN NEXT thoughts_set;
END LOOP;
RETURN;
END
$function$
;

CREATE OR REPLACE FUNCTION public.get_username_from_id(user_id_input uuid)
 RETURNS text
 LANGUAGE plpgsql
AS $function$declare
username_output text;
BEGIN
SELECT profiles.username INTO username_output FROM public.profiles as profiles
WHERE profiles.id = user_id_input;
return username_output;
END$function$
;

grant delete on table "public"."interactions_test" to "postgres";

grant insert on table "public"."interactions_test" to "postgres";

grant references on table "public"."interactions_test" to "postgres";

grant select on table "public"."interactions_test" to "postgres";

grant trigger on table "public"."interactions_test" to "postgres";

grant truncate on table "public"."interactions_test" to "postgres";

grant update on table "public"."interactions_test" to "postgres";

grant delete on table "public"."post_interactions" to "postgres";

grant insert on table "public"."post_interactions" to "postgres";

grant references on table "public"."post_interactions" to "postgres";

grant select on table "public"."post_interactions" to "postgres";

grant trigger on table "public"."post_interactions" to "postgres";

grant truncate on table "public"."post_interactions" to "postgres";

grant update on table "public"."post_interactions" to "postgres";

grant delete on table "public"."post_revisions" to "postgres";

grant insert on table "public"."post_revisions" to "postgres";

grant references on table "public"."post_revisions" to "postgres";

grant select on table "public"."post_revisions" to "postgres";

grant trigger on table "public"."post_revisions" to "postgres";

grant truncate on table "public"."post_revisions" to "postgres";

grant update on table "public"."post_revisions" to "postgres";

grant delete on table "public"."posts" to "postgres";

grant insert on table "public"."posts" to "postgres";

grant references on table "public"."posts" to "postgres";

grant select on table "public"."posts" to "postgres";

grant trigger on table "public"."posts" to "postgres";

grant truncate on table "public"."posts" to "postgres";

grant update on table "public"."posts" to "postgres";

grant delete on table "public"."profiles" to "postgres";

grant insert on table "public"."profiles" to "postgres";

grant references on table "public"."profiles" to "postgres";

grant select on table "public"."profiles" to "postgres";

grant trigger on table "public"."profiles" to "postgres";

grant truncate on table "public"."profiles" to "postgres";

grant update on table "public"."profiles" to "postgres";

grant delete on table "public"."thoughts_test" to "postgres";

grant insert on table "public"."thoughts_test" to "postgres";

grant references on table "public"."thoughts_test" to "postgres";

grant select on table "public"."thoughts_test" to "postgres";

grant trigger on table "public"."thoughts_test" to "postgres";

grant truncate on table "public"."thoughts_test" to "postgres";

grant update on table "public"."thoughts_test" to "postgres";
