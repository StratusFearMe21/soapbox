"use server";

import {createClient} from "@/app/utils/supabase/server";

export async function getProfileThoughts(username: string) {
  const supabase =  await createClient();
  const { data: thoughts, error } = await supabase
    .from("thoughts_test")
    .select(`
      *,
      profile:profiles!thoughts_test_user_id_fkey1 ( nickname, username ),
      like_count,
      reply_count
    `)
    // filters to inner-join thoughts
    .not('profile', 'is', null)
    // filters to thoughts under a specific username
    .eq('profile.username', username)
    // filters to full thoughts (not replies)
    .is('parent_thought', null)

  if (thoughts) return thoughts;
  if (error) console.log(error);
  return null;
}