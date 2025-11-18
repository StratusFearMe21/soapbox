'use server';
import { createClient } from "@/app/utils/supabase/server"
import {revalidatePath} from "next/cache";

export async function PostThought(formData: FormData) {
  'use server';
  const supabase = await createClient();
  const textContent = formData.get("textContent");

  const { data, error } = await supabase.auth.getClaims();
  if (data?.claims?.user_metadata && textContent) {
    const user_id: string = data.claims.user_metadata.sub.toString();
    const { error } = await supabase.from('thoughts_test').insert({ text_content: textContent.toString(), user_id: user_id });
    if (error) throw error;
  } else {
    throw error;
  }

  revalidatePath('/test')
}