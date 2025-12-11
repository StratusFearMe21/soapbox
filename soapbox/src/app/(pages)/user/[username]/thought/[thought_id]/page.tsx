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
import LikeButton from "@/app/components/like-button";
import FollowButton from "@/app/components/follow-button";
import Link from "next/link";
import {Button} from "@/app/components/ui/button";

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
  const [ requesterId, setRequesterId ] = useState<string>('');
  const [ loading, setLoading ] = useState<boolean>(true);

  const [ likeCount , setLikeCount ] = useState(0);
  const [ isLiked, setIsLiked ] = useState(false);
  // needs to be setup
  const [ isFollowing, setIsFollowing ] = useState(false);

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
        setReplyCount(thought.reply_count);
        setLikeCount(thought.like_count);
        setReplies(thought.replies);
        // for delete button
        setRequesterId(thought.requester_id);

        setIsLiked(thought.is_liked ? thought.is_liked : false);
        setIsFollowing(thought.profile?.is_following ? thought.profile?.is_following : false)
      }

      // finally make it all visible :D
      setLoading(false);
    }

    fetchThought();
  }, [params])


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

  return loading ? (
    <Loading/>
  ) : (thought && !thought.parent_thought) ? (
    <div className={"flex flex-col items-center w-screen min-h-screen pt-20 pb-20 gap-4"}>
      <div className={"w-full max-w-xl glass p-8 relative rounded-2xl"}>
        <div>

          <Button variant={"glass"} className={"m-0 normal-case tracking-normal"} asChild>
            <Link className={"text-md rounded-4xl z-10"}  href={"/user/" + thought?.profile?.username} >
              <p className={"inline-block font-bold"}>
                {thought?.profile?.username}
              </p>
              <p className={"inline-block opacity-70"}>
                @{thought?.profile?.nickname}
              </p>
            </Link>
          </Button>

          <div className={"text-xl mt-2 w-full wrap-break-word"}>
            {thought.text_content}
          </div>

          <div className={"h-1 bg-white/20 w-full mt-4 mb-2"}/>

          <div className={"mb-0 text-md text-white/60"}>
            {createdAtDate ? createdAtDate: null}
          </div>
          <div className={"flex flex-row w-full text-md font-medium gap-8"}>
            <div className={""}>{replyCount == 1 ? replyCount + " Reply" : replyCount + " Replies"}</div>
            <div className={""}>{likeCount == 1 ? likeCount + " Like" : likeCount + " Likes"}</div>
          </div>
        </div>

        <div className={"absolute top-0 right-0 gap-8 mt-2 mr-2 flex w-full flex-row-reverse"}>
          {requesterId == thought.user_id ? <DeleteThoughtButton thought_id={thoughtId}/> : null}
        </div>

        <div className={"absolute bottom-0 right-0 gap-8 mb-6 mr-6 flex w-full flex-row-reverse"}>
          <LikeButton thought_id={thought.id} likeChangeFunction={handleLikeChange} is_liked={isLiked}/>
          <FollowButton user_id={thought.user_id} followChangeFunction={handleFollowChange} is_followed={isFollowing}/>
        </div>
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