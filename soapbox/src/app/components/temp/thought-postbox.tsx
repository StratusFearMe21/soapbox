"use client";
import {PostThought} from "@/app/test/actions/postThought";

export default function ThoughtPostBox() {

  return (
    <form
      className={"flex flex-col justify-center items-center m-4 w-full max-w-md [&>*]:m-2"}
      action={PostThought}
    >
      <textarea
        name="textContent"
        className={"resize-none glass p-4 rounded-xl w-full bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"}
        placeholder="Enter some text here..." rows={6}
      ></textarea>
      <input
        className={"glass px-6 py-2 rounded-full hover:bg-white/20 transition-all cursor-pointer font-bold uppercase tracking-wider text-sm"}
        type={"submit"}
        value="Post Thought"
      />
    </form>
  )
}