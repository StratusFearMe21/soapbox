"use client";

import { getThought, deleteThought } from "@/app/user/actions/postActions";
import DeleteThoughtButton from "@/app/components/delete-thought-button";
import {useEffect, useState} from "react";
import { Thought } from "@/app/components/thought";

export default function ThoughtPage
(
  { params, } : { params: Promise<{username: string, thought_id: string}> }
)
{
  const [ username, setUsername ] = useState<string>('');
  const [ createdAtDate, setCreatedAtDate ] = useState<string>('');
  const [ thoughtId, setThoughtId ] = useState<string>('');
  const [ thought, setThought ] = useState<Thought | null>(null);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    const fetchThought = async () => {
      const {username} = await params;
      const {thought_id} = await params;
      const thought = await getThought(username, thought_id);

      if (thought) {
        const options = {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const created_at_date = new Intl.DateTimeFormat(navigator.language, options).format(new Date(thought.created_at));
        setCreatedAtDate(created_at_date);
        setThought(thought);
      }

      setUsername(username);
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
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className={"font-bold text-2xl"}>Thought not found!</p>
    </div>
  )
}