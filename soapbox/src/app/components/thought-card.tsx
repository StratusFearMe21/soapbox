"use client";

import Link from "next/link";
import { Thought } from "@/app/components/thought";
import formatDate from "@/app/utils/formatDate";
import LikeButton from "@/app/components/like-button";
import {useEffect, useState} from "react";
import FollowButton from "./follow-button";
import {Button} from "@/app/components/ui/button";

interface ThoughtProp {
  noFollow: boolean;
  thought: Thought
  nickname: string,
  username: string,
}

export default function ThoughtCard( { noFollow, thought, nickname, username } : ThoughtProp ) {
  const reply_count = thought.reply_count ? thought.reply_count : 0;
  const like_count = thought.like_count ? thought.like_count : 0;
  //const follow_count = thought.follow_count ? thought.follow_count : 0;

  const [ likeCount , setLikeCount ] = useState(like_count);
  const [ isLiked, setIsLiked ] = useState(thought.is_liked ? thought.is_liked : false);
  // needs to be setup
  const [ isFollowing, setIsFollowing ] = useState(thought.is_following ? thought.is_following : false);

  useEffect(() => {
    const loadLike = async () => {
      setIsLiked(thought.is_liked ? thought.is_liked : false);
    }

    loadLike();
  }, [thought.is_liked]);

  useEffect(() => {
    const loadFollow= async () => {
      setIsFollowing(thought.profile?.is_following ? thought.profile.is_following: false);
    }

    loadFollow();
  }, [thought.profile?.is_following]);

  const handleLikeChange = (increase: boolean) => {
    if (increase) {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    } else {
      setIsLiked(false);
      setLikeCount(likeCount - 1)
    }
  }
  const handleFollowChange = (new_value: boolean) => {
     setIsFollowing(new_value);
  }

  const createdAt = formatDate(thought.created_at);

  //<div className={"absolute top-0 left-0 right-0 bottom-0 opacity-0 bg-slate-950 m-0 p-0 z-10 hover:opacity-30"}></div>

  return (
      <div className={"w-full p-6 mb-4 relative glass rounded-2xl transition-all duration-300 hover:scale-[1.01]"}>
        <Link href={"/user/" + username + "/thought/" + thought.id} className={"absolute top-0 left-0 rounded-lg w-full h-full z-0"}></Link>

        <Button variant={"glass"} className={"m-0 normal-case tracking-normal"} asChild>
          <Link className={"text-md rounded-4xl z-10"}  href={"/user/" + username} >
            <p className={"inline-block font-bold"}>
              {username}
            </p>
            <p className={"inline-block opacity-70"}>
              @{nickname}
            </p>
          </Link>
        </Button>

        <div className={"mt-2 w-full wrap-break-word"}>
          <p className={(thought.text_content.toLowerCase() == "burger" ? "flex flex-col items-center animate-spin" : "")}>{thought.text_content}</p>
        </div>

        <div className={"h-px bg-white/20 w-full my-2"}/>

        <div className={"mb-1 text-sm text-white/60"}>
          {createdAt}
        </div>

        <div className={"flex flex-row w-full gap-8 font-medium"}>
          <div className={"text-sm"}>{reply_count == 1 ? reply_count + " Reply" : reply_count + " Replies"}</div>
          <div className={"text-sm"}>{likeCount == 1 ? likeCount + " Like" : likeCount + " Likes"}</div>
        </div>

        {/*buttons*/}
        <div className={"absolute bottom-0 right-0 gap-8 mb-6 mr-6 flex w-full flex-row-reverse z-10"}>
          <LikeButton thought_id={thought.id} likeChangeFunction={handleLikeChange} is_liked={isLiked}/>
          {!noFollow ? <FollowButton user_id={thought.user_id} followChangeFunction={handleFollowChange} is_followed={isFollowing}/> : null}
        </div>
      </div>
  )
}
