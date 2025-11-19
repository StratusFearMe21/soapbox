"use client";

import Link from "next/link";
import { Thought, Profile } from "@/app/components/thought";
import formatDate from "@/app/utils/formatDate";
import {useEffect, useState} from "react";
import {createClient} from "@/app/utils/supabase/client";

interface ThoughtProp {
  thought: Thought
}

export default function ThoughtCard( { thought } : ThoughtProp ) {
  const [ replyCount, setReplyCount ] = useState<number>(0);
  const [ likeCount, setLikeCount ] = useState<number>(0);
  const createdAt = formatDate(thought.created_at);

  useEffect( () => {
    const fetchInteractionCount = async () => {
      const supabase = createClient();
      const { data: replyCount } = await supabase
        .rpc("get_thought_reply_count", { thought_id_input: thought.id })

      setReplyCount(replyCount)
    }
    fetchInteractionCount();
  }, [thought.id])
  //<div className={"absolute top-0 left-0 right-0 bottom-0 opacity-0 bg-slate-950 m-0 p-0 z-10 hover:opacity-30"}></div>

  return (
    <div className={"w-96 border-t-4 p-4 relative hover:bg-slate-950"}>
      <Link href={"/user/" + thought.profile?.username + "/thought/" + thought.id} className={"w-full h-full"}>
        <div className={"text-sm"}>
          <p className={"inline-block font-bold mr-1"}>
            {thought.profile?.nickname}
          </p>
          <p className={"inline-block"}>
            @{thought.profile?.username}
          </p>
        </div>
        <div className={"mt-2 mb-2"}>
          {thought.text_content}
        </div>
        <div className={"text-sm"}>
          {createdAt}
        </div>
      </Link>
      <div className={"text-sm inline-block mr-4"}>{replyCount} Replies</div>
      <div className={"text-sm inline-block"}>{likeCount} Likes</div>
    </div>
  )
}