"use server";

import {createClient} from "@/app/utils/supabase/server";
import {getCurrentUserId} from "@/app/utils/getCurrentUserId";
import {fetchIsLikeds} from "@/app/utils/likeActions";

export async function getFullThought(username: string, thought_id: string) {
  const supabase = await createClient();
  const { data: thought, error } = await supabase
    .from("thoughts_test")
    .select(`
      *,
      profile:profiles!thoughts_test_user_id_fkey1 ( 
        username,
        nickname
      ),
      like_count:interactions_test!interactions_test_thought_id_fkey( count ),
      reply_count:thoughts_test!parent_thought ( count ),
      replies:thoughts_test!parent_thought (
        *,
        profile:profiles!thoughts_test_user_id_fkey1 ( 
          username,
          nickname
        ),
        like_count:interactions_test!interactions_test_thought_id_fkey( count )
      )
    `)
    // filters to only thoughts by given username
    // (incorrect urls with mismatched usernames won't display any thought)
    .eq('profile.username', username)
    // filters to thoughts under a specific username
    .eq('id', thought_id)
    // and filters replies to only ones with correct parent thought
    .eq('replies.parent_thought', thought_id)
    .order('created_at', { referencedTable: 'replies', ascending: false })
    .single();

  if (error) console.log(error);

  if (thought) {
    await fetchIsLikeds(thought.replies)

    thought.requester_id = await getCurrentUserId();
    return thought;
  }
  else return null;
}