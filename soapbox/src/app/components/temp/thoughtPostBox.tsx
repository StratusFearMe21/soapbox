"use client";
import {PostThought} from "@/app/test/actions/postThought";

export default function ThoughtPostBox() {

  return (
    <form
      className={"flex flex-col justify-center items-center m-4 [&>*]:m-2"}
      action={PostThought}
    >
        <textarea
          name="textContent"
          className={"resize-none border-4 border-white p-2"}
          placeholder="Enter some text here..." rows={6} cols={40}
        ></textarea>
      <input
        className={"border-4 border-white p-2"}
        type={"submit"}
      />
    </form>
  )
}