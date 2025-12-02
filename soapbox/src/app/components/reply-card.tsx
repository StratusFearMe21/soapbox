import { Thought} from "@/app/components/thought";
import formatDate from "@/app/utils/formatDate";
import {useEffect, useState} from "react";
//import {getInteractionsCount} from "@/app/user/actions/likeActions";

interface ReplyProp {
  reply: Thought
}

export default function ReplyCard({ reply }: ReplyProp) {
  const [ likeCount, setLikeCount ] = useState<number>(0)
  useEffect(() => {
    const fetchInteractionCount = async () => {
      //const { likeCount } = await getInteractionsCount(reply.id)
      setLikeCount(likeCount => likeCount + 1)
    }

    fetchInteractionCount();
  }, [reply.id])

  return (
    <div className={"border-4 p-4 w-96"}>
      <p className={"inline-block mr-1 font-bold"}>{reply.profile?.nickname}</p>
      <p className={"inline-block"}>@{reply.profile?.username}</p>
      <p className={"mt-1 mb-1"}>{reply.text_content}</p>
      <p className={"text-sm"}>{formatDate(reply.created_at)}</p>
      <div className={"flex flex-row w-full"}>
        <div className={"text-sm"}>{likeCount == 1 ? likeCount + " Like" : likeCount + " Likes"}</div>
      </div>
    </div>
  )
}