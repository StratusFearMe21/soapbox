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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const reply_count = thought.reply_count[0].count;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const like_count = thought.like_count[0].count;

  const [ likeCount , setLikeCount ] = useState(like_count);

  const handleLikeChange = (increase: boolean) => {
    if (increase) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1)
    }
  }

  const createdAt = formatDate(thought.created_at);

  //<div className={"absolute top-0 left-0 right-0 bottom-0 opacity-0 bg-slate-950 m-0 p-0 z-10 hover:opacity-30"}></div>

  return (
    <div className={"w-96 border-t-4 p-4 relative hover:bg-slate-950"}>
      <Link href={"/user/" + username + "/thought/" + thought.id} className={"w-full h-full"}>
        <div className={"text-sm"}>
          <p className={"inline-block font-bold mr-1"}>
            {nickname}
          </p>
          <p className={"inline-block"}>
            @{username}
          </p>
        </div>
        <div className={"mt-2 mb-2"}>
          {thought.text_content}
        </div>
        <div className={"text-sm"}>
          {createdAt}
        </div>
      </Link>
      <div className={"flex flex-row w-full"}>
        <div className={"w-[20%] text-sm"}>{reply_count == 1 ? reply_count + " Reply" : reply_count + " Replies"}</div>
        <div className={"text-sm"}>{likeCount == 1 ? likeCount + " Like" : likeCount + " Likes"}</div>
      </div>
      <LikeButton thought_id={thought.id} likeChangeFunction={handleLikeChange} is_liked={thought.is_liked ? thought.is_liked : false}/>
    </div>
  )
}