"use server";

import {createClient} from "@/app/utils/supabase/server";
import {getCurrentUserId} from "@/app/utils/getCurrentUserId";
import {Thought} from "@/app/components/thought";

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

  const liked_thought_ids: string[] = []
  const new_thoughts: Thought[] = []
  return data
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
