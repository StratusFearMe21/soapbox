import { Thought} from "@/app/components/thought";
import formatDate from "@/app/utils/formatDate";
import {useState} from "react";
import LikeButton from "@/app/components/like-button";
import DeleteThoughtButton from "@/app/components/delete-thought-button";
import Link from "next/link";
import {Button} from "@/app/components/ui/button";

interface ReplyProp {
  reply: Thought;
  requester_id: string;
}

export default function ReplyCard({ reply, requester_id }: ReplyProp) {
  const [ likeCount, setLikeCount ] = useState<number>(reply.like_count ? reply.like_count : 0);
  const [ isLiked, setIsLiked ] = useState(reply.is_liked ? reply.is_liked : false)

  const handleLikeChange = async (increase: boolean) => {
    if (increase) {
      setIsLiked(true)
      setLikeCount(likeCount + 1);
    } else {
      setIsLiked(false)
      setLikeCount(likeCount - 1)
    }
  }

  return (
    <div className={"glass p-6 w-full rounded-xl"}>

      <Button variant={"glass"} className={"m-0 normal-case tracking-normal"} asChild>
        <Link className={"text-md rounded-4xl z-10"} href={"/user/" + reply?.profile?.username}>
          <p className={"inline-block font-bold"}>
            {reply?.profile?.username}
          </p>
          <p className={"inline-block opacity-70"}>
            @{reply?.profile?.nickname}
          </p>
        </Link>
      </Button>

      <p className={"mt-1 leading-relaxed w-full wrap-break-word"}>{reply.text_content}</p>

      <div className={"h-px bg-white/20 w-full my-2"}/>

      <p className={"text-sm text-white/60 mb-1"}>{formatDate(reply.created_at)}</p>

      <div className={"flex flex-row w-full font-medium "}>
        <div className={"text-sm"}>{likeCount == 1 ? likeCount + " Like" : likeCount + " Likes"}</div>
      </div>

      <div className={"absolute top-0 right-0 gap-8 mt-2 mr-2 flex flex-row-reverse"}>
        {requester_id == reply.user_id ? <DeleteThoughtButton thought_id={reply.id}/> : null}
      </div>


      <div className={"absolute bottom-0 right-0 gap-8 mb-6 mr-6 flex w-full flex-row-reverse"}>
        <LikeButton thought_id={reply.id} likeChangeFunction={handleLikeChange} is_liked={isLiked}/>
      </div>

    </div>
  )
}