"use server";

import {createClient} from "@/app/utils/supabase/server";
import {getCurrentUserId} from "@/app/utils/getCurrentUserId";

export default async function EditUserProfile (
  user :
  {nickname: string, username: string, bio: string}
) {
  const supabase = await createClient();
  const user_id = await getCurrentUserId();

  const {error} = await supabase
    .from('profiles')
    .update({ username: user.username, nickname: user.nickname, bio: user.bio })
    .eq('id', user_id)

  if (error) return { error: error.code, message: error.message };
}