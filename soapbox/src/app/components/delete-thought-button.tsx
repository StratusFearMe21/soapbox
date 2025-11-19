"use client";

import {deleteThought} from "@/app/user/actions/postActions";

interface DeleteThoughtProps {
  thought_id: string,
}

export default function DeleteThoughtButton ( { thought_id } : DeleteThoughtProps ) {
  return (
    <form
      action={deleteThought}
      className={"border-4 font-bold p-2 absolute top-0 right-0 hover:bg-slate-500 active:bg-slate-300"}
    >
      <input type={"hidden"} name={"thought_id"} value={thought_id}/>
      <input type={"submit"} value={"Delete"}/>
    </form>
  )
}