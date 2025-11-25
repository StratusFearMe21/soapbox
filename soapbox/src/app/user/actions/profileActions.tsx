"use server";

import {createClient} from "@/app/utils/supabase/server";

export async function getUserProfile(username: string) {
  const supabase =  await createClient();

  const { data: user } = await supabase
    .rpc('get_profile', { username_input: username})

  return user
}

export async function getUserPosts(username: string) {
  const supabase =  await createClient();
  const { data: posts, error } = await supabase
    .from("thoughts_test")
    .select(`
      *,
      profile:profiles!thoughts_test_user_id_fkey1 ( nickname, username )
    `)
    // filters to inner-join thoughts
    .not('profile', 'is', null)
    // filters to thoughts under a specific username
    .eq('profile.username', username)
    // filters to full thoughts (not replies)
    .is('parent_thought', null)

  if (error) console.log(error);
  if (!error) return posts
  else return [];
}

export async function getUserPostCount(username: string) {
  const supabase = await createClient();
  const {data: post_count, error} = await supabase
    .rpc('get_thoughts_count', { username_input: username})

  if (error) console.log(error);
  if (!error) return post_count
}

