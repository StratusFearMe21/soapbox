"use client";

import {createClient} from "@/app/utils/supabase/client";

export async function getUserProfile(username: string) {
  const supabase =  createClient();

  const { data: user } = await supabase
    .rpc('get_profile', { username_input: username})

  return user
}

export async function getUserPosts(username: string) {
  const supabase =  createClient();
  const { data: posts, error } = await supabase
    .from("thoughts_test")
    .select(`
      *,
      profile:profiles!inner ( nickname, username )
    `)
    .eq('profiles.username', username)
    .is('parent_thought', null)

  if (error) console.log(error);
  if (!error) return posts
  else return [];
}

export async function getUserPostCount(username: string) {
  const supabase = createClient();
  const {data: post_count, error} = await supabase
    .rpc('get_thoughts_count', { username_input: username})

  if (error) console.log(error);
  if (!error) return post_count
}

