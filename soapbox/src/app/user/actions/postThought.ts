"use server";

import {createClient} from "@/app/utils/supabase/server";

export async function postThought(thought_text: string) {
  const supabase =  await createClient();
  const { error } = await supabase.from('thoughts_test').insert({ text_content: thought_text });

  if (error) console.log(error);
  if (error) return error;
  else return null;
}