'use server';

import { createClient } from "@/app/utils/supabase/server";
import { Thought, FullThought } from "@/app/components/thought";
import { getInteractionsCount } from "@/app/utils/likeActions";

export async function getFullThoughtInfo(username: string, thought_id: string) {
  'use server';
  const thought: Thought | null = await getThought(username, thought_id);
  const { replyCount, likeCount } = await getInteractionsCount(thought_id);

  if (thought) {
    const fullThought: FullThought = {
      thought: thought,
      likeCount: likeCount,
      replyCount: replyCount,
    }
    return fullThought;
  }
  else return null;
}

export async function getThought(username: string, thought_id: string): Promise<Thought | null> {
  const supabase = await createClient();
  const { data: thought, error } = await supabase
    .from('thoughts_test')
    .select(`
      *,
      profile:profiles!thoughts_test_user_id_fkey1 ( nickname, username )
    `)
    .eq('id', thought_id)
    .eq('profile.username', username)
    .single();
  if (!error) return thought;
  //else console.log(error)
  else return null;
}

export async function getReplies(thought_id: string) {
  const supabase = await createClient();
  const { data: replies, error } = await supabase
    .from('thoughts_test')
    .select(`
      *,
      profile:profiles!thoughts_test_user_id_fkey1 ( nickname, username )
    `)
    .eq('parent_thought', thought_id);

  if (error) return null;
  else return replies;
}

export async function deleteThought(thought_id: string) {
  const supabase = await createClient();
  const response = await supabase
    .from("thoughts_test")
    .delete()
    .eq('id', thought_id);

  if (response.error) console.log(response);
}