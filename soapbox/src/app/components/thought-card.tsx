"use client";

import Link from "next/link";
import { Thought } from "@/app/components/thought";
import formatDate from "@/app/utils/formatDate";
import LikeButton from "@/app/components/like-button";
import {useEffect, useState} from "react";

interface ThoughtProp {
  thought: Thought
  nickname: string,
  username: string,
}

export default function ThoughtCard( { thought, nickname, username } : ThoughtProp ) {
  const reply_count = thought.reply_count ? thought.reply_count : 0;
  const like_count = thought.like_count ? thought.like_count : 0;

  const [ likeCount , setLikeCount ] = useState(like_count);
  const [ isLiked, setIsLiked ] = useState(thought.is_liked ? thought.is_liked : false);

  useEffect(() => {
    const loadLike = async () => {
      setIsLiked(thought.is_liked ? thought.is_liked : false);
    }

    loadLike();
  }, [thought.is_liked]);

  const handleLikeChange = (increase: boolean) => {
    if (increase) {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    } else {
      setIsLiked(false);
      setLikeCount(likeCount - 1)
    }
  }

  const createdAt = formatDate(thought.created_at);

  //<div className={"absolute top-0 left-0 right-0 bottom-0 opacity-0 bg-slate-950 m-0 p-0 z-10 hover:opacity-30"}></div>

  return (
    <div className={"w-full p-6 mb-4 relative glass rounded-2xl transition-all duration-300 hover:scale-[1.02]"}>
      <Link href={"/user/" + username + "/thought/" + thought.id} className={"w-full h-full"}>
        <div className={"text-md m-0"}>
          <p className={"inline-block font-bold mr-1"}>
            {nickname}
          </p>
          <p className={"inline-block"}>
            @{username}
          </p>
        </div>
        <div className={"mt-2 w-full wrap-break-word"}>
          {thought.text_content}
        </div>

        <div className={"h-px bg-white/20 w-full my-2"}/>

        <div className={"mb-1 text-sm text-white/60"}>
          {createdAt}
        </div>
      </Link>
      <div className={"flex flex-row w-full"}>
      <div className={"w-[20%] text-sm"}>{reply_count == 1 ? reply_count + " Reply" : reply_count + " Replies"}</div>
        <div className={"text-sm"}>{likeCount == 1 ? likeCount + " Like" : likeCount + " Likes"}</div>
      </div>
      <LikeButton thought_id={thought.id} likeChangeFunction={handleLikeChange} is_liked={isLiked}/>
    </div>
  )
}