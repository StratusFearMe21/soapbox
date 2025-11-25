'use server';
import { createClient } from "@/app/utils/supabase/server"
import {revalidatePath} from "next/cache";

export async function PostThought(formData: FormData) {
  'use server';
  const supabase = await createClient();
  const textContent = formData.get("textContent");

  // security tested and workz as intended
  // works once again 11/24
  const { data: {user}, error } = await supabase.auth.getUser();
  if (user && textContent) {
    const user_id: string = user.id.toString();
    const { error } = await supabase.from('thoughts_test').insert({ text_content: textContent.toString(), user_id: user_id });
    if (error) throw error;
  } else {
    throw error;
  }

  //TODO refresh current page
  //revalidatePath('/test')
}