import {getPost} from "@/app/user/actions/postActions";
import ThoughtCard from "@/app/components/thought-card";

export default async function UserPage
(
  { params, } : { params: Promise<{username: string, thought_id: string}> }
)
{
  const {username} = await params;
  const {thought_id} = await params;
  const thought = await getPost(thought_id);

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


  return thought && thought.profile.username == username ? (
    <div className={"flex flex-col justify-center items-center w-screen h-screen"}>
      <div className={"w-96 border-4 p-4 mb-4"}>
        <div>
          <div className={"text-lg"}>
            <p className={"font-bold inline-block mr-1"}>{thought.profile.nickname}</p>
            <p className={"inline-block"}>@{thought.profile.username}</p>
          </div>
          <div className={"text-xl mt-2 mb-4"}>
            {thought.text_content}
          </div>
          <div className={"border-t-4 mt-4 mb-4"}/>
          <div className={"mb-2"}>
            {created_at_date}
          </div>
          <div>
            <p className={"inline-block mr-4"}>0 Replies</p>
            <p className={"inline-block"}>0 Likes</p>
          </div>
        </div>
      </div>

      <div>
        this is where replies would be!
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className={"font-bold text-2xl"}>Thought not found!</p>
    </div>
  )
}