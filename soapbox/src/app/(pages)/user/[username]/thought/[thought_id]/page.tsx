"use client";

import {getThought, getReplies, getFullThoughtInfo} from "@/app/user/actions/postActions";
import DeleteThoughtButton from "@/app/components/delete-thought-button";
import {useEffect, useState} from "react";
import { Thought } from "@/app/components/thought";
import ReplyCard from "@/app/components/reply-card";
import formatDate from "@/app/utils/formatDate";
import {getCurrentUserId} from "@/app/utils/getCurrentUserId";
import {getFullThought} from "@/app/user/actions/getFullThought";

export default function ThoughtPage
(
  { params, } : { params: Promise<{username: string, thought_id: string}> }
)
{
  const [ createdAtDate, setCreatedAtDate ] = useState<string>('');
  const [ thoughtId, setThoughtId ] = useState<string>('');
  const [ thought, setThought ] = useState<Thought | null>(null);
  const [ replies, setReplies ] = useState<Thought[] | null>(null);
  const [ replyCount, setReplyCount ] = useState<number>(0);
  const [ likeCount, setLikeCount ] = useState<number>(0);
  const [ isOwnThought, setIsOwnThought ] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    const fetchThought = async () => {
      const {username} = await params;
      const {thought_id} = await params;
      const thought = await getFullThought(username, thought_id);

      if (thought) {
        setThoughtId(thought_id);
        setThought(thought);
        setCreatedAtDate(formatDate(thought.created_at));
        setReplyCount(thought.reply_count[0].count);
        setLikeCount(thought.like_count[0].count);
        setReplies(thought.replies);
      }

      // delete button visibility
      const auth_id = await getCurrentUserId();
      if (auth_id == thought?.user_id) setIsOwnThought(true);
      // finally make it all visible :D
      setLoading(false);
    }

    fetchThought();
  }, [params])

  return loading ? (
    <div></div>
  ) : (thought) ? (
    <div className={"flex flex-col items-center w-screen min-h-screen pt-20 pb-20"}>
      <div className={"w-full max-w-lg glass p-8 mb-6 relative rounded-2xl"}>
        { isOwnThought ? <DeleteThoughtButton thought_id={thoughtId}/> : null}
        <div>
          <div className={"text-lg"}>
            <p className={"font-bold inline-block mr-1 text-white"}>{thought?.profile?.nickname}</p>
            <p className={"inline-block text-white/70"}>@{thought?.profile?.username}</p>
          </div>
          <div className={"text-xl mt-4 mb-6 leading-relaxed"}>
            {thought.text_content}
          </div>

          <div className={"h-px bg-white/20 w-full my-4"}/>

          <div className={"mb-2 text-sm text-white/60"}>
            {createdAtDate ? createdAtDate: null}
          </div>
          <div className={"flex flex-row w-full text-sm font-medium"}>
            <div className={"mr-6"}>{replyCount == 1 ? replyCount + " Reply" : replyCount + " Replies"}</div>
            <div className={""}>{likeCount == 1 ? likeCount + " Like" : likeCount + " Likes"}</div>
          </div>
        </div>
      </div>

      <div className={"w-full max-w-lg flex flex-col gap-4"}>
        {replies?.map((reply) => (
          <ReplyCard key={reply.id} reply={reply}/>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className={"font-bold text-2xl"}>Thought not found!</p>
    </div>
  )
}