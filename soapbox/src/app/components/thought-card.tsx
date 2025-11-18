import Link from "next/link";

export interface Thought {
  id: number,
  created_at: string,
  user_id: string,
  text_content: string,
  profile: User
}

interface User {
  id: string,
  nickname: string,
  username: string
}

interface ThoughtProp {
  thought: Thought
}

export default function ThoughtCard( { thought } : ThoughtProp ) {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const created_at_date = new Intl.DateTimeFormat(navigator.language, options).format(new Date(thought.created_at));

  //<div className={"absolute top-0 left-0 right-0 bottom-0 opacity-0 bg-slate-950 m-0 p-0 z-10 hover:opacity-30"}></div>

  return (
    <div className={"w-96 border-t-4 p-4 relative hover:bg-slate-950"}>
      <Link href={"/user/" + thought.profile.username + "/thought/" + thought.id} className={"w-full h-full"}>
        <div className={"text-sm"}>
          <p className={"inline-block font-bold mr-1"}>
            {thought.profile.nickname}
          </p>
          <p className={"inline-block"}>
            @{thought.profile.username}
          </p>
        </div>
        <div className={"mt-2 mb-2"}>
          {thought.text_content}
        </div>
        <div className={"text-sm"}>
          {created_at_date}
        </div>
      </Link>
      <div className={"text-sm"}>0 Likes</div>
    </div>
  )
}