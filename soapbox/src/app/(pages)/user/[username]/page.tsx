"use client";

import styles from "../../styles.module.css";
import ThoughtCard from "@/app/components/thought-card";
import {Profile} from "@/app/components/thought"
import {useEffect, useState} from "react";
import formatDate from "@/app/utils/formatDate";
import {getProfile} from "@/app/user/actions/getFullProfile";
import useMetadata from "@/app/utils/useMetadata";
import Loading from "@/app/components/loading";
import FollowButton from "@/app/components/follow-button";

export default function UserPage
  (
    { params, } : { params: Promise<{username: string}> }
  )
{
  const [ profile, setProfile ] = useState<Profile | null>(null);
  const [ thoughtCount, setThoughtCount ] = useState<number>(0);
  const [ isFollowing, setIsFollowing ] = useState<boolean>(false);
  const [ joinDate, setJoinDate ] = useState<string>("");
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ requesterId, setRequesterId ] = useState<string>("");

  // set site metadata
  useMetadata((profile ? `${profile.nickname} (@${profile.username})` : "Profile") + " | Soapbox");

  useEffect(() => {
    const fetchProfile = async () => {
      const {username} = await params;
      const profile = await getProfile(username);

      if (profile) {
        // set profile and joinDate
        setProfile(profile);
        if (profile.created_at) setJoinDate(formatDate(profile.created_at));
        // set thought count
        if (profile.thought_count) setThoughtCount(profile.thought_count);
        if (profile.is_following) setIsFollowing(profile.is_following);
        if (profile.requester_id) setRequesterId(profile.requester_id);
      }
      setLoading(false);

    }
    fetchProfile();
  }, [params]);

  const onFollowingUpdate = async(new_value: boolean) => {
    setIsFollowing(new_value);
  }

  return loading ? (
    <Loading/>
  ) : (profile) ? (
    <div className="w-screen min-h-screen flex flex-col items-center overflow-y-auto scroll-m-0 overflow-x-hidden pt-10 pb-20">

      <div className={"flex flex-col items-center w-full max-w-2xl px-4"}>
        <div className="w-full p-6 mb-8 glass rounded-2xl text-center">
          <p className={styles.nickname}>{profile.nickname}</p>
          <p className={styles.username + " mb-2"}>@{profile.username}</p>
          {profile.id && profile.id != requesterId ? <FollowButton user_id={profile.id} is_followed={isFollowing} followChangeFunction={onFollowingUpdate}/> : null }
          <p className={styles.bio + " mt-2"}>{profile.bio ? profile.bio : null}</p>
          <p className={styles.joinDate}>Joined {joinDate}</p>
          <p className={styles.postCount}>{thoughtCount} Thoughts</p>
        </div>

        <p className={"text-center font-bold"}></p>

        <div className="w-lg flex flex-col items-center gap-4">
          {profile.thoughts?.map((thought) => (
            <ThoughtCard key={thought.id} noFollow={true} thought={thought} nickname={ profile.nickname ? profile.nickname : '' } username={ profile.username ? profile.username : '' } />
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
