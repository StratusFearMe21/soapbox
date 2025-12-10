"use server";

import { createClient } from "@/app/utils/supabase/server";
import { getCurrentUserId } from "@/app/utils/getCurrentUserId";
import { Thought } from "@/app/components/thought";

export async function fetchIsFollows(thoughts: Thought[]) {
  // push all ids to new array
  const user_ids = []
  for (const thought of thoughts) {
    user_ids.push(thought.user_id);
  }
  // worry about follows on them
  const followed_thoughts = await getIsFollows(user_ids);

  // parse if there are any
  const followed_user_ids = [];
  const new_thoughts = [];
  if (followed_thoughts) {
    for (const followed_thought of followed_thoughts) {
      followed_user_ids.push(followed_thought.to);
    }
    // check if thought id is in that array
    for (const thought of thoughts) {
      thought.is_followed = followed_user_ids.includes(thought.user_id);
      new_thoughts.push(thought)
    }
  } else {
    // else set all to un-followed
    for (const thought of thoughts) {
      thought.is_followed = false;
      new_thoughts.push(thought)
    }
  }
}

export async function getIsFollows(user_ids: string[]) {
  const supabase = await createClient();
  const user_id = await getCurrentUserId();
  const { data, error } = await supabase
    .from("follows")
    .select(`
      to
    `)
    .eq('from', user_id)
    .in('to', user_ids);
  if (error) {
    console.log(error);
    return null;
  } else return data;
}


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
