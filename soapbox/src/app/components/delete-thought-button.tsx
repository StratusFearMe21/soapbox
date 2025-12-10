"use client";

import {deleteThought} from "@/app/user/actions/postActions";
import {redirect} from "next/navigation";
import {ConfirmDialog} from "@/app/components/ui/confirm-dialog";

interface DeleteThoughtProps {
  thought_id: string,
}

export default function DeleteThoughtButton ( { thought_id } : DeleteThoughtProps ) {

  const handleDeleteThought = async () => {
    await deleteThought(thought_id);

    const regex = new RegExp(`/thought/` + thought_id);
    redirect(location.toString().replace(regex, ''));
  }

  return (
    <div className={"m-4"}>
      <ConfirmDialog
        buttonText={"Delete"}
        mainText={"Are you sure you want to delete this thought?"}
        confirmText={"Yes"}
        cancelText={"No"}
        onConfirm={handleDeleteThought}
      />
    </div>
  )
}

{/*<Button
  onClick={handleDeleteThought}
  variant={"glass"}
  className={"text-xs w-fit h-6"}
>
  Delete
</Button>*/}