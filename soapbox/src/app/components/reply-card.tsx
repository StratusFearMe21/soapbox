import { Thought} from "@/app/components/thought";
import formatDate from "@/app/utils/formatDate";
import {useState} from "react";
import LikeButton from "@/app/components/like-button";
import DeleteThoughtButton from "@/app/components/delete-thought-button";
//import {getInteractionsCount} from "@/app/user/actions/likeActions";

interface ReplyProp {
  reply: Thought;
  requester_id: string;
}

export default function ReplyCard({ reply, requester_id }: ReplyProp) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const like_count = reply.like_count[0].count;
  const [ likeCount, setLikeCount ] = useState<number>(like_count)

  const handleLikeChange = async (increase: boolean) => {
    if (increase) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1)
    }
  }

  return (
    <div className={"glass p-6 w-full rounded-xl"}>
      <p className={"inline-block mr-1 font-bold"}>{reply.profile?.nickname}</p>
      <p className={"inline-block"}>@{reply.profile?.username}</p>
      <p className={"mt-1 leading-relaxed w-full wrap-break-word"}>{reply.text_content}</p>

      <div className={"h-px bg-white/20 w-full my-2"}/>

      <p className={"text-sm text-white/60 mb-1"}>{formatDate(reply.created_at)}</p>
      <div className={"flex flex-row w-full"}>
        <div className={"text-sm"}>{likeCount == 1 ? likeCount + " Like" : likeCount + " Likes"}</div>
      </div>

      { reply.user_id == requester_id ? <DeleteThoughtButton thought_id={reply.id}/> : null}
      <LikeButton thought_id={reply.id} likeChangeFunction={handleLikeChange} is_liked={reply.is_liked ? reply.is_liked : false}/>
    </div>
  )
}