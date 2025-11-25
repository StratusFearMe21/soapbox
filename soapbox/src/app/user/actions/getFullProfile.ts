"use server";

import {Profile, Thought} from "@/app/components/thought";
import {getUserPostCount, getUserPosts, getUserProfile} from "@/app/user/actions/profileActions";
import {getCurrentUserId} from "@/app/utils/getCurrentUserId";
import {getProfileThoughts} from "@/app/user/actions/getUserThoughts";
import {createClient} from "@/app/utils/supabase/server";

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
        like_count:interactions_test!interactions_test_thought_id_fkey( count ),
        reply_count:thoughts_test!parent_thought ( count )
      ),
      thought_count:thoughts_test!thoughts_test_user_id_fkey1 ( count )
    `)
    // filters to thoughts under a specific username
    .eq('username', username)
    // filters to full thoughts (not replies)
    .is('thoughts.parent_thought', null)
    .single();

  if (error) console.log(error);

  if (profile) return profile;
  else return null;
}