import { Thought} from "@/app/components/thought";
import formatDate from "@/app/utils/formatDate";

interface ReplyProp {
  reply: Thought
}

export default function ReplyCard({ reply }: ReplyProp) {
  return (
    <div className={"border-4 p-4 w-96"}>
      <p className={"inline-block mr-1 font-bold"}>{reply.profile?.nickname}</p>
      <p className={"inline-block"}>@{reply.profile?.username}</p>
      <p className={"mt-1 mb-1"}>{reply.text_content}</p>
      <p className={"text-sm"}>{formatDate(reply.created_at)}</p>
    </div>
  )
}