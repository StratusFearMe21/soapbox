"use server";

import {createClient} from "@/app/utils/supabase/server";

export async function getCurrentUserId() {
  const supabase = await createClient();
  const {data, error} = await supabase.auth.getClaims();
  if (error) throw error;

  return data?.claims?.user_metadata?.sub;
}

export async function getCurrentUsername() {
  const user_id = await getCurrentUserId();
  if (user_id) {
    const supabase = await createClient();
    const {data: username} = await supabase
      .rpc('get_username_from_id', { user_id_input: user_id })

    if (username) return username;
  }
  return null;
}