"use server";

import { createClient } from "@/app/utils/supabase/server";
import { getCurrentUserId } from "@/app/utils/getCurrentUserId";

export async function addFollow(to: string) {
  const supabase = await createClient()
  const from = await getCurrentUserId();
  const { data, error } = await supabase
    .from("follows")
    .insert({ from, to })
    .select();

  // error testing
  if (error) console.log(error);
  return !!data;
}

export async function removeFollow(to: string) {
  const supabase = await createClient()
  const from = await getCurrentUserId();

  const { data, error } = await supabase
    .from("follows")
    .delete()
    .eq("from", from)
    .eq("to", to)
    .select();

  if (error) console.log(error);
  return !!data;
}

export async function invertFollow(user_id: string, isFollow: boolean) {
  if (isFollow) {
    // opposite because if it was successfully removed
    // then it is no longer followed (-> false)
    return !await removeFollow(user_id);
  }
  else {
    // same because if it was successfully added
    // then it is now followed (-> true)
    return await addFollow(user_id);
  }
}

export async function getFollowCount(user_id: string) {
  const supabase = await createClient();
  const { data: followCount } = await supabase
    .rpc("get_user_follow_count", { user_id_input: user_id })
  return { followCount };
}
