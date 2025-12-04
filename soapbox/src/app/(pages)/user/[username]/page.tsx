"use client";

import Link from "next/link";
import styles from "../styles.module.css";
import ThoughtCard from "@/app/components/thought-card";
import {Profile} from "@/app/components/thought"
import {useEffect, useState} from "react";
import formatDate from "@/app/utils/formatDate";
import {getProfile} from "@/app/user/actions/getFullProfile";
import {getIsLikeds} from "@/app/utils/likeActions";

export default function UserPage
  (
    { params, } : { params: Promise<{username: string}> }
  )
{
  const [ profile, setProfile ] = useState<Profile | null>(null);
  const [ thoughtCount, setThoughtCount ] = useState<number>(0);
  const [ joinDate, setJoinDate ] = useState<string>("");
  const [ isOwnProfile, setIsOwnProfile ] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const {username} = await params;
      const profile = await getProfile(username);

      if (profile) {
        // set profile and joinDate
        setProfile(profile);
        if (profile.created_at) setJoinDate(formatDate(profile.created_at));
        // set thought count
        if (profile.thought_count) setThoughtCount(profile.thought_count[0].count);

        // TODO temporary code for detecting likes
        //  cannot figure out why this won't work in it's own function
        //  definitely something to do with arrays in memory though
        //  will worry later as this works for time being

        // push all ids to new array
        const thought_ids = []
        for (const thought of profile.thoughts) {
          thought_ids.push(thought.id);
        }
        // worry about likes on them
        const liked_thoughts = await getIsLikeds(thought_ids);

        // parse if there are any
        const liked_thought_ids = [];
        const new_thoughts= [];
        if (liked_thoughts) {
          for (const liked_thought of liked_thoughts) {
            liked_thought_ids.push(liked_thought.thought_id);
          }
          // check if thought id is in that array
          for (const thought of profile.thoughts) {
            thought.is_liked = liked_thought_ids.includes(thought.id);
            new_thoughts.push(thought)
          }
        } else {
          // else set all to un-liked
          for (const thought of profile.thoughts) {
            thought.is_liked = false;
            new_thoughts.push(thought)
          }
        }

        // disable / enable edit button
        //setIsOwnProfile(profile.id === requester_id);
      }
      setLoading(false);

    }
    fetchProfile();
  }, [params]);

  return loading ? (
    <div></div>
  ) : (profile) ? (
    <div className="w-screen min-h-screen flex flex-col items-center overflow-y-auto overflow-x-hidden pt-10 pb-20">
      {isOwnProfile ? <Link className={"fixed bottom-4 left-4 glass px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-all z-50"} href={"/user/edit"}>Edit Profile</Link> : null}

      <div className={"flex flex-col items-center w-full max-w-2xl px-4"}>
        <div className="w-full p-6 mb-8 glass rounded-2xl text-center">
          <p className={styles.nickname}>{profile.nickname}</p>
          <p className={styles.username}>@{profile.username}</p>
          <p className={styles.bio}>{profile.bio ? profile.bio : null}</p>
          <p className={styles.joinDate}>Joined {joinDate}</p>
          <p className={styles.postCount}>{thoughtCount} Thoughts</p>
        </div>

        <p className={"text-center font-bold"}></p>

        <div className="w-full flex flex-col items-center gap-4">
          {profile.thoughts?.map((thought) => (
            <ThoughtCard key={thought.id} thought={thought} nickname={ profile.nickname ? profile.nickname : '' } username={ profile.username ? profile.username : '' } />
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