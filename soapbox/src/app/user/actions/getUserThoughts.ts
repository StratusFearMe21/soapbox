"use server";

import {createClient} from "@/app/utils/supabase/server";
import {FullThought, Thought} from "@/app/components/thought";
import {getInteractionsCount} from "@/app/utils/likeActions";

export async function getProfileThoughts(username: string) {
  const supabase =  await createClient();
  const { data: thoughts, error } = await supabase
    .from("thoughts_test")
    .select(`
      *,
      profile:profiles!thoughts_test_user_id_fkey1 ( nickname, username ),
      like_count:interactions_test!interactions_test_thought_id_fkey( count ),
      reply_count:thoughts_test!parent_thought ( count )
    `)
    // filters to inner-join thoughts
    .not('profile', 'is', null)
    // filters to thoughts under a specific username
    .eq('profile.username', username)
    // filters to full thoughts (not replies)
    .is('parent_thought', null)

  if (thoughts) return thoughts;
  else return null;
}