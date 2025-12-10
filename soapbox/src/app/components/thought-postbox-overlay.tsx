import {useEffect, useState} from "react";
import {SquarePen, X, XIcon} from 'lucide-react';
import {Card} from "@/app/components/ui/card";
import {Button} from "@/app/components/ui/button";
import {Textarea} from "@/app/components/ui/textarea";
import {Label} from "@/app/components/ui/label";
import {postThought} from "@/app/utils/postThought";
import {redirect} from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from "@/app/components/ui/dialog";
import {DialogTrigger} from "@radix-ui/react-dialog";
import * as React from "react";

export function ThoughtPostDialog() {
  const [ textContent, setTextContent ] = useState("");
  const [ error, setError ] = useState("");
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isConfirmOpen, setIsConfirmOpen ] = useState(false);

  const onOpenChange = async () => {
    if ( isOpen ) {
      if (textContent.length > 0) {
        setIsConfirmOpen(true);
      } else {
        setTextContent("");
        setError("");
        setIsOpen(false);
      }
    } else {
      setIsOpen(true);
    }
  }

  const onConfirmOpenChange = async () => {
    if ( isConfirmOpen ) {
      setIsConfirmOpen(false);
    }
  }

  const onConfirm = async () => {
    setTextContent("");
    setError("");
    setIsConfirmOpen(false);
    setIsOpen(false);

  }

  const onPostThought = async () => {
    if (textContent.length > 0) {
      const error = await postThought(textContent)
      if (error) {
        if (error.code == '42501') setError("Error when posting!");
      } else {
        setTextContent("");
        setError("");
        redirect(location.toString());
      }
    }
  }

  return (
    <Dialog
      open={ isOpen }
      onOpenChange={onOpenChange}
    >
      <DialogTrigger asChild>
        <Button
          className={"size-4 pt-4 pb-4 group-hover:w-full group-hover:bg-white/20 font-bold rounded-lg m-0 text-sm text-link ease-in-out bg-white/10 border border-white/10 backdrop-blur-sm transition-all duration-200"}
          asChild
        >
          <div>
            <SquarePen
              className={"group-hover:opacity-0 transition-discrete duration-300"}
              strokeWidth={2.8}
            />
            <Label
              className={"font-bold absolute opacity-0 group-hover:opacity-100 transition-opacity duration-75 group-hover:duration-700"}
            >
              New Thought
            </Label>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className={"glass lg:min-w-md flex flex-col justify-center items-center p-8"}>
        <DialogTitle>
          <Label className={"text-lg font-bold"}>Thought Canvas</Label>
        </DialogTitle>

        <ConfirmCloseDialog open={isConfirmOpen} onConfirmOpenChange={onConfirmOpenChange} onConfirm={onConfirm} />

        <Textarea
          className={"w-full min-h-20 max-h-40 resize-none wrap-anywhere"}
          value={textContent}
          onChange={(e) => (setTextContent(e.target.value))}
          placeholder={"Write your thoughts here!"}
          maxLength={128}
        />

        <DialogFooter>
          <Button
            variant={"glass"}
            className={"text-xs w-fit h-6 m-0"}
            onClick={onPostThought}
            disabled={textContent.length === 0}
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


interface ConfirmCloseDialogProps {
  open: boolean;
  onConfirmOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

function ConfirmCloseDialog( { open, onConfirmOpenChange, onConfirm }: ConfirmCloseDialogProps ) {
  return (
    <Dialog
      open={open}
      onOpenChange={onConfirmOpenChange}
    >
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className={"glass"}>
        <DialogTitle hidden/>

        <DialogDescription
          className={"flex flex-col w-full text-center font-medium"}
        >
          Are you sure you want to delete this thought?
        </DialogDescription>
        <DialogFooter className={"flex flex-row w-full justify-center items-center"}>

          <Button
            variant={"glass"}
            className={"text-xs w-fit h-6 m-0"}
            onClick={onConfirm}
          >
            Yes
          </Button>

          <DialogClose asChild>
            <Button
              variant={"glass"}
              className={"text-xs w-fit h-6 m-0"}
            >
              No
            </Button>
          </DialogClose>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}