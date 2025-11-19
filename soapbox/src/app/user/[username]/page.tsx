"use client";

import {getUserProfile, getUserPosts, getUserPostCount} from "@/app/user/actions/profileActions";
import {createClient} from "@/app/utils/supabase/client";
import Link from "next/link";
import styles from "../styles.module.css";
import ThoughtCard from "@/app/components/thought-card";
import { Thought, Profile } from "@/app/components/thought"
import { useState, useEffect } from "react";
import formatDate from "@/app/utils/formatDate";

export default function UserPage
  (
    { params, } : { params: Promise<{username: string}> }
  )
{
  const [ profile, setProfile ] = useState<Profile | null>(null);
  const [ thoughts, setThoughts ] = useState<Thought[]>([]);
  const [ thoughtCount, setThoughtCount ] = useState<number>(0);
  const [ joinDate, setJoinDate ] = useState<string>("");
  const [ isOwnProfile, setIsOwnProfile ] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const {username} = await params;
      const profile: Profile = await getUserProfile(username);
      const thoughts: Thought[] = await getUserPosts(username);
      const thought_count = await getUserPostCount(username);

      const checkIsOwnProfile = async () => {
        const supabase = createClient();
        const { data } = await supabase.auth.getClaims()
        const user_id = data?.claims?.user_metadata?.sub;
        return profile.id == user_id;
      }

      // format date
      if (profile) {
        // set all basic states
        setProfile(profile);
        setThoughts(thoughts);
        setThoughtCount(thought_count);
        setIsOwnProfile(await checkIsOwnProfile());

        if (profile.created_at) setJoinDate(formatDate(profile.created_at));
      }
      setLoading(false);
    }

    fetchProfile();
  }, [params]);

  return loading ? (
    <div></div>
  ) : (profile) ? (
    <div className="w-screen h-fit flex flex-col items-center overflow-y-auto overflow-x-hidden">
      {isOwnProfile ? <Link className={"fixed bottom-0 left-0 border-4 p-4 m-4 font-bold"} href={"/user/edit"}>Edit Profile</Link> : null}

      <div className={"border-4"}>
        <div className="border-b-4 w-96 p-4">
          <p className={styles.nickname}>{profile.nickname}</p>
          <p className={styles.username}>@{profile.username}</p>
          <p className={styles.bio}>{profile.bio ? profile.bio : null}</p>
          <p className={styles.joinDate}>Joined {joinDate}</p>
          <p className={styles.postCount}>{thoughtCount} Thoughts</p>
        </div>

        <p className={"text-center font-bold"}></p>

        <div>
          {thoughts?.map((thought) => (
            <ThoughtCard key={thought.id} thought={thought} />
          ))}
        </div>
      </div>

    </div>
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className={"font-bold text-2xl"}>User not found!</p>
    </div>
  )
}