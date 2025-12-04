"use client";

import {deleteThought} from "@/app/user/actions/postActions";
import {redirect} from "next/navigation";

interface DeleteThoughtProps {
  thought_id: string,
}

export default function DeleteThoughtButton ( { thought_id } : DeleteThoughtProps ) {
  const handleDeleteThought = async (formData: FormData) => {
    const thought_id = formData.get("thought_id")?.toString();
    if (thought_id) await deleteThought(thought_id);

    const regex = new RegExp(`/thought/` + thought_id);
    redirect(location.toString().replace(regex, ''));
  }

  return (
    <form
      action={handleDeleteThought}
      className={"border-4 font-bold p-2 absolute top-0 right-0 hover:bg-slate-500 active:bg-slate-300"}
    >
      <input type={"hidden"} name={"thought_id"} value={thought_id}/>
      <input type={"submit"} value={"Delete"}/>
    </form>
  )
}