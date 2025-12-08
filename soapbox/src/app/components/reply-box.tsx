import {Card, CardContent} from "./ui/card";
import {Textarea} from "@/app/components/ui/textarea";
import {Button} from "@/app/components/ui/button";
import {useState} from "react";
import {postReply} from "@/app/utils/postReply";
import {redirect} from "next/navigation";

export default function ReplyBox({thought_id} : {thought_id: string}) {
  const [ error, setError ] = useState("");
  const [ replyText, setReplyText ] = useState("");
  const [ thoughtId ] = useState(thought_id);

  const onReply = async () => {
    const error = await postReply(replyText, thoughtId);
    if (error) {
      setError(error.message);
    }
    else {
      setReplyText("");
      redirect(location.toString());
    }
  }

  return (
    <Card className={"flex flex-col p-4"}>
      <CardContent className={"flex flex-col justify-center items-center p-2 gap-4"}>
        <Textarea
          className={"resize-none h-24"}
          value={replyText}
          placeholder={"Write a reply..."}
          maxLength={128}
          onChange={(e) => {setReplyText(e.target.value)}}
        />
        <Button
          className={"w-20 m-0 h-8"}
          variant={"glass"}
          onClick={onReply}
        >
          Reply
        </Button>
        { error ? <div>{error}</div> : null }
      </CardContent>
    </Card>
  )
}