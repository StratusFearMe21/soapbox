"use client";

import {deleteThought} from "@/app/user/actions/postActions";
import {redirect} from "next/navigation";
import {Button} from "@/app/components/ui/button";

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
    <Button
      onClick={handleDeleteThought}
      variant={"glass"}
      className={"absolute top-0 right-0"}
    >
      Delete
    </Button>
  )
}