"use server";

import {getCurrentUserId} from "@/app/utils/getCurrentUserId";
import {createClient} from "@/app/utils/supabase/server";

export async function getProfile(username: string) {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(`
      *,
      thoughts:thoughts_test!thoughts_test_user_id_fkey1 ( 
        *,
        like_count,
        reply_count,
        is_liked
      ),
      thought_count,
      is_following
    `)
    // filters to thoughts under a specific username
    .eq('username', username)
    // filters to full thoughts (not replies)
    .is('thoughts.parent_thought', null)
    // sorts thoughts by created_at (newest first)
    .order('created_at', { referencedTable: 'thoughts', ascending: false })
    .single();

  if (error) console.log(error);

  if (profile) {
    profile.requester_id = await getCurrentUserId();
    return profile;
  }
  else return null;
}
