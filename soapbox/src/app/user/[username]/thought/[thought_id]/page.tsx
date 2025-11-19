"use client";

import { getThought, getReplies } from "@/app/user/actions/postActions";
import DeleteThoughtButton from "@/app/components/delete-thought-button";
import {useEffect, useState} from "react";
import { Thought } from "@/app/components/thought";
import ReplyCard from "@/app/components/reply-card";
import formatDate from "@/app/utils/formatDate";

export default function ThoughtPage
(
  { params, } : { params: Promise<{username: string, thought_id: string}> }
)
{
  const [ createdAtDate, setCreatedAtDate ] = useState<string>('');
  const [ thoughtId, setThoughtId ] = useState<string>('');
  const [ thought, setThought ] = useState<Thought | null>(null);
  const [ replies, setReplies ] = useState<Thought[] | null>(null);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    const fetchThought = async () => {
      const {username} = await params;
      const {thought_id} = await params;
      const thought = await getThought(username, thought_id);
      const replies = await getReplies(thought_id);

      if (thought) {
        setCreatedAtDate(formatDate(thought.created_at));
        setThought(thought);
        setReplies(replies);
      }

      setThoughtId(thought_id);
      setLoading(false);
    }

    fetchThought();
  }, [params])

  return loading ? (
    <div></div>
  ) : (thought) ? (
    <div className={"flex flex-col justify-center items-center w-screen h-screen"}>
      <div className={"w-96 border-4 p-4 mb-4 relative"}>
        <DeleteThoughtButton thought_id={thoughtId}/>
        <div>
          <div className={"text-lg"}>
            <p className={"font-bold inline-block mr-1"}>{thought?.profile?.nickname}</p>
            <p className={"inline-block"}>@{thought?.profile?.username}</p>
          </div>
          <div className={"text-xl mt-2 mb-4"}>
            {thought.text_content}
          </div>
          <div className={"border-t-4 mt-4 mb-4"}/>
          <div className={"mb-2"}>
            {createdAtDate ? createdAtDate: null}
          </div>
          <div>
            <p className={"inline-block mr-4"}>0 Replies</p>
            <p className={"inline-block"}>0 Likes</p>
          </div>
        </div>
      </div>

      <div>
        this is where replies would be!
        {replies?.map((reply) => (
          <ReplyCard key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className={"font-bold text-2xl"}>Thought not found!</p>
    </div>
  )
}