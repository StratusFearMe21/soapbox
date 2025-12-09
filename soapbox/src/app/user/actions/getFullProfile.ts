"use server";

import {Profile, Thought} from "@/app/components/thought";
import {getUserPostCount, getUserPosts, getUserProfile} from "@/app/user/actions/profileActions";
import {getCurrentUserId} from "@/app/utils/getCurrentUserId";
import {createClient} from "@/app/utils/supabase/server";
import {fetchIsLikeds} from "@/app/utils/likeActions";

export interface FullProfile {
  profile: Profile,
  thoughts: Thought[],
  thought_count?: number,
  requester_id?: string,
}

export async function getFullProfile(username: string) {
  const profile: Profile = await getUserProfile(username);
  const thoughts: Thought[] = await getUserPosts(username);
  await getProfile(username);
  const thought_count = await getUserPostCount(username);
  const requester_id: string = await getCurrentUserId();

  const fullProfile: FullProfile = {
    profile,
    thoughts,
    thought_count,
    requester_id,
  }

  return fullProfile;
}

export async function getProfile(username: string) {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(`
      *,
      thoughts:thoughts_test!thoughts_test_user_id_fkey1 ( 
        *,
        like_count,
        reply_count
      ),
      thought_count
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
    await fetchIsLikeds(profile.thoughts);
    //profile.requester_id = await getCurrentUserId();
    return profile;
  }
  else return null;
}