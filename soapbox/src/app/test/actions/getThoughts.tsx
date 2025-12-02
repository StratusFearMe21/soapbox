'use server';
import { createClient } from "@/app/utils/supabase/server";

export async function GetThoughts() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('thoughts_test').select('*');
  return data ? data : [];
}