'use server';
import { UserInfoBar } from "@/app/components/userInfoBar";
import { Thought, ThoughtsTable}  from "@/app/components/thoughtsTable";
import { GetThoughts } from "@/app/test/actions/getThoughts";
import ThoughtPostBox from "@/app/components/thoughtPostBox";
import Navbar from "@/app/components/navbar";

export default async function TestPage() {

  const thoughts: Thought[] = await GetThoughts();

  return (
    <div className={"flex flex-col items-center p-8"}>

      <UserInfoBar/>

      <ThoughtPostBox/>

      <ThoughtsTable thoughts={thoughts} />

      <Navbar/>

    </div>
  )
}
