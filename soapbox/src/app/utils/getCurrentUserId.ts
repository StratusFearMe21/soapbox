import {createClient} from "@/app/utils/supabase/server";

export async function getCurrentUserId() {
  const supabase = await createClient();
  const {data, error} = await supabase.auth.getClaims();
  if (error) throw error;

  const user_id = data?.claims?.user_metadata?.sub;
  return user_id;
}