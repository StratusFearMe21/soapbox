'use server';
import { createClient } from "@/app/utils/supabase/server";

export async function GetThoughts() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('thoughts_test').select('*,profiles!thoughts_test_user_id_fkey1(nickname,username)');
  console.log(error)
  return data ? data : [];
}
