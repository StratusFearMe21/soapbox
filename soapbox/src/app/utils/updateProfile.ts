"use server";

import {getCurrentUserId} from "@/app/utils/getCurrentUserId";
import {createClient} from "@/app/utils/supabase/server";

interface ProfileInfoProp {
  nickname: string;
  username: string;
  bio: string;
}

export async function updateProfile(profileInfo: ProfileInfoProp) {
  const supabase = await createClient();
  const user_id = await getCurrentUserId();

  const {error} = await supabase
    .from('profiles')
    .update(
      {
        username: profileInfo.username,
        nickname: profileInfo.nickname,
        bio: profileInfo.bio
      }
    )
    .eq('id', user_id)

  if (error) {
    console.log(error);
    return false
  }
  else return true;
}