"use server";

import {createClient} from "@/app/utils/supabase/server";

export async function postReply(thought_text: string, parent_thought_id: string) {
  const supabase =  await createClient();
  const { error } = await supabase
    .from('thoughts_test')
    .insert(
      {
        text_content: thought_text,
        parent_thought: parent_thought_id
      }
    );

  if (error) console.log(error);
  if (error) return error;
  else return null;
}