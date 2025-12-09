"use client";

import DeleteThoughtButton from "@/app/components/delete-thought-button";
import {useEffect, useState} from "react";
import { Thought } from "@/app/components/thought";
import ReplyCard from "@/app/components/reply-card";
import formatDate from "@/app/utils/formatDate";
import {getFullThought} from "@/app/user/actions/getFullThought";
import ReplyBox from "@/app/components/reply-box";
import useMetadata from "@/app/utils/useMetadata";
import Loading from "@/app/components/loading";

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
  const [ requesterId, setRequesterId ] = useState<string>('');
  const [ loading, setLoading ] = useState<boolean>(true);

  // set site metadata
  useMetadata((thought?.profile ? `${thought.profile.nickname}: "${thought.text_content}"` : "Thought") + " | Soapbox");

  useEffect(() => {
    const fetchThought = async () => {
      const {username} = await params;
      const {thought_id} = await params;
      const thought = await getFullThought(username, thought_id);

      if (thought && !thought.parent_thought) {
        setThoughtId(thought_id);
        setThought(thought);
        setCreatedAtDate(formatDate(thought.created_at));
        setReplyCount(thought.reply_count[0].count);
        setLikeCount(thought.like_count[0].count);
        setReplies(thought.replies);
        // for delete button
        setRequesterId(thought.requester_id);
      }

      // finally make it all visible :D
      setLoading(false);
    }

    fetchThought();
  }, [params])

  return loading ? (
    <Loading/>
  ) : (thought && !thought.parent_thought) ? (
    <div className={"flex flex-col items-center w-screen min-h-screen pt-20 pb-20 gap-4"}>
      <div className={"w-full max-w-lg glass p-8 relative rounded-2xl"}>
        <div>
          <div className={"text-xl"}>
            <p className={"font-bold inline-block mr-1 text-white"}>{thought?.profile?.nickname}</p>
            <p className={"inline-block text-white/70"}>@{thought?.profile?.username}</p>
          </div>
          <div className={"text-xl mt-2 w-full wrap-break-word"}>
            {thought.text_content}
          </div>

          <div className={"h-1 bg-white/20 w-full my-4"}/>

          <div className={"mb-2 text-sm text-white/60"}>
            {createdAtDate ? createdAtDate: null}
          </div>
          <div className={"flex flex-row w-full text-sm font-medium"}>
            <div className={"mr-6"}>{replyCount == 1 ? replyCount + " Reply" : replyCount + " Replies"}</div>
            <div className={""}>{likeCount == 1 ? likeCount + " Like" : likeCount + " Likes"}</div>
          </div>
        </div>
        { requesterId == thought.user_id ? <DeleteThoughtButton thought_id={thoughtId}/> : null}
      </div>

      <div className={"w-full max-w-md m-0 p-0"}>
        <ReplyBox thought_id={thoughtId}></ReplyBox>
      </div>

      <div className={"w-full max-w-md m-0 p-0 flex flex-col gap-4"}>
        {replies?.map((reply) => (
          <ReplyCard key={reply.id} reply={reply} requester_id={requesterId}/>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className={"font-bold text-2xl"}>Thought not found!</p>
    </div>
  )
}