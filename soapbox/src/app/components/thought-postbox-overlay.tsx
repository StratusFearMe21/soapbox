import {ChangeEvent, useState} from "react";
import {X} from 'lucide-react';
import {Card} from "@/app/components/ui/card";
import {Button} from "@/app/components/ui/button";
import {Textarea} from "@/app/components/ui/textarea";
import {Label} from "@/app/components/ui/label";

interface ThoughtPostBoxOverlayProps {
  isShown: boolean;
  onOpen: () => void;
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
        "flex flex-col justify-center items-center z-20"
      }
    >
      <div className={"absolute bg-background opacity-50 h-full w-full "} onClick={onCancel}></div>

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

export function ThoughtPostBoxOverlay({isShown, onOpen, onClose}: ThoughtPostBoxOverlayProps ) {
  const [ isConfirmShown, setIsConfirmShown ] = useState(false);
  const [ textContent, setTextContent ] = useState("");

  const onOpenConfirmDialog = async () => {
    if (!isConfirmShown) {
      setIsConfirmShown(true);
    }
  }

  const onConfirmDialog = async() => {
    //TODO wipe textContent and hide the whole window
    setTextContent("");

    if (isConfirmShown) {
      setIsConfirmShown(false);
      onClose();
    }
  }

  const onCancelDialog = async () => {
    //TODO probably done but come back to check
    if (isConfirmShown) {
      setIsConfirmShown(false);
    }
  }

  const handleChangeText = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.target.value)
  }

  return isShown ? (
    <div
      className={
        "absolute top-0 left-0 h-screen w-screen " +
        "flex flex-col items-center justify-center z-10 "
      }
    >
      <ConfirmCloseDialog isShown={isConfirmShown} onConfirm={onConfirmDialog} onCancel={onCancelDialog} />

      <div className={"absolute bg-background opacity-50 h-full w-full "} onClick={onOpenConfirmDialog}></div>

      <Card className={"relative w-[35%] h-[40%] p-8"}>
        <Button className={"absolute m-4 w-8 h-8 top-0 right-0"} onClick={onOpenConfirmDialog}>
          <X />
        </Button>

        <div className={"w-full h-full flex flex-col items-center justify-center [&>*]:m-2"}>
          <Label className={"text-lg font-bold"}>test postbox TITLE!!!</Label>
          <Textarea className={" h-[60%] w-[90%] resize-none"} onChange={handleChangeText} placeholder={"write your thought here!!!!! :D"} />
          <Button className={""} onClick={() => {console.log(textContent)}}>Post Thought</Button>
        </div>
      </Card>
    </div>
  ) : null;
}