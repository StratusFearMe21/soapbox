"use server";

import {createClient} from "@/app/utils/supabase/server";
import {getCurrentUserId} from "@/app/utils/getCurrentUserId";
import {Thought} from "@/app/components/thought";

export async function fetchIsLikeds(thoughts: Thought[]) {
  // push all ids to new array
  const thought_ids = []
  for (const thought of thoughts) {
    thought_ids.push(thought.id);
  }
  // worry about likes on them
  const liked_thoughts = await getIsLikeds(thought_ids);

  // parse if there are any
  const liked_thought_ids = [];
  const new_thoughts= [];
  if (liked_thoughts) {
    for (const liked_thought of liked_thoughts) {
      liked_thought_ids.push(liked_thought.thought_id);
    }
    // check if thought id is in that array
    for (const thought of thoughts) {
      thought.is_liked = liked_thought_ids.includes(thought.id);
      new_thoughts.push(thought)
    }
  } else {
    // else set all to un-liked
    for (const thought of thoughts) {
      thought.is_liked = false;
      new_thoughts.push(thought)
    }
  }
}

export async function getIsLikeds(thought_ids: string[]) {
  const supabase = await createClient();
  const user_id = await getCurrentUserId();
  const { data, error } = await supabase
    .from("interactions_test")
    .select(`
      thought_id
    `)
    .eq('interactor_id', user_id)
    .in('thought_id', thought_ids);
  if (error) {
    console.log(error);
    return null;
  } else return data;
}


export async function addLike(thought_id: string) {
  const supabase = await createClient()
  const user_id = await getCurrentUserId();
  const { data, error } = await supabase
    .from("interactions_test")
    .insert({thought_id, interactor_id: user_id})
    .select();

  // error testing
  if (error) console.log(error);
  return !!data;
}

export async function removeLike(thought_id: string) {
  const supabase = await createClient()
  const user_id = await getCurrentUserId();

  const { data, error } = await supabase
    .from("interactions_test")
    .delete()
    .eq("thought_id", thought_id)
    .eq("interactor_id", user_id)
    .select();

  if (error) console.log(error);
  return !!data;
}

export async function invertLike(thought_id: string, isLiked: boolean) {
  if (isLiked) {
    // opposite because if it was successfully removed
    // then it is no longer liked (-> false)
    return !await removeLike(thought_id);
  }
  else {
    // same because if it was successfully added
    // then it is now liked (-> true)
    return await addLike(thought_id);
  }
}

export async function getInteractionsCount(thought_id: string) {
  const supabase = await createClient();
  const { data: replyCount } = await supabase
    .rpc("get_thought_reply_count", { thought_id_input: thought_id })
  const { data: likeCount } = await supabase
    .rpc("get_thought_like_count", { thought_id_input: thought_id })
  return { replyCount, likeCount };
}
