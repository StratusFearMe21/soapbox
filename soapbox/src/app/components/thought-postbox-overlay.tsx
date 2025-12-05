import { useState } from "react";
import {X} from 'lucide-react';
import {Card} from "@/app/components/ui/card";
import {Button} from "@/app/components/ui/button";
import {Textarea} from "@/app/components/ui/textarea";
import {Label} from "@/app/components/ui/label";
import {postThought} from "@/app/utils/postThought";
import {redirect} from "next/navigation";

interface ThoughtPostBoxOverlayProps {
  isShown: boolean;
  onClose: () => void;
}

interface ConfirmCloseDialogProps {
  isShown: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmCloseDialog({isShown, onConfirm, onCancel} : ConfirmCloseDialogProps ) {
  return isShown ? (
    <div
      className={
        "absolute h-screen w-screen top-0 left-0 " +
        "flex flex-col justify-center items-center z-20 " +
        "animate-in fade-in"
      }
    >
      <div className={"absolute h-full w-full "} onClick={onCancel}></div>

      <Card className={"relative h-[15%] w-[27%] flex flex-col items-center justify-center [&>*]:m-2"}>
        <Label className={"text-lg text-center pl-2 pr-2"}>Are you sure you want to discard this post?</Label>
        <div className={"w-full flex flex-row justify-around"}>
          <Button onClick={onConfirm}>Confirm</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </Card>
    </div>
  ) : null;
}

export function ThoughtPostBoxOverlay({isShown, onClose}: ThoughtPostBoxOverlayProps ) {
  const [ isConfirmShown, setIsConfirmShown ] = useState(false);
  const [ textContent, setTextContent ] = useState("");
  const [ error, setError ] = useState("");

  const onOpenConfirmDialog = async () => {
    if (textContent.length > 0 && !isConfirmShown) {
      setIsConfirmShown(true);
    } else {
      onClose();
    }
  }

  const onConfirmDialog = async() => {
    setTextContent("");
    setError("");

    if (isConfirmShown) {
      onClose();
      setIsConfirmShown(false);
    }
  }

  const onCancelDialog = async () => {
    //TODO probably done but come back to check
    if (isConfirmShown) {
      setIsConfirmShown(false);
    }
  }

  const onPostThought = async () => {
    if (textContent.length > 0 && !isConfirmShown) {
      const error = await postThought(textContent)
      if (error) {
        if (error.code == '42501') setError("Error when posting!");
      } else {
        setTextContent("");
        setError("");
        onClose();
        redirect(location.toString());
      }
    }
  }

  return isShown ? (
    <div
      className={
        "absolute top-0 left-0 h-screen w-screen " +
        "flex flex-col items-center justify-center z-10 " +
        "animate-in fade-in"
      }
    >
      <ConfirmCloseDialog isShown={isConfirmShown} onConfirm={onConfirmDialog} onCancel={onCancelDialog} />

      <div className={"absolute bg-black/60 backdrop-blur-sm h-full w-full"} onClick={onOpenConfirmDialog}></div>

      <Card className={"relative w-[35%] h-[40%] p-8 bg-card"}>
        <Button className={"absolute m-4 w-8 h-8 top-0 right-0 rounded-full"} onClick={onOpenConfirmDialog} variant={"ghost"}>
          <X />
        </Button>

        <div className={"w-full h-full flex flex-col items-center justify-center [&>*]:m-2"}>
          <Label className={"text-lg font-bold"}>test postbox TITLE!!!</Label>
          <Textarea
            className={"h-[60%] w-[90%] resize-none"}
            onChange={(e) => (setTextContent(e.target.value))}
            placeholder={"write your thought here!!!!! :D"}
          />
          <Button
            variant={"base_button"}
            onClick={onPostThought}
            disabled={textContent.length == 0}
          >
            Post Thought
          </Button>
          {error ? <div className="text-sm text-red-500">{error}</div> : null}
        </div>
      </Card>
    </div>
  ) : null;
}