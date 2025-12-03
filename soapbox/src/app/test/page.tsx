'use server';
import { UserInfoBar } from "@/app/components/temp/userInfoBar";
import { GetThoughts } from "@/app/test/actions/getThoughts";
import ThoughtPostBox from "@/app/components/temp/thoughtPostBox";
import Navbar from "@/app/components/navbar";
import { SearchableThoughtsTable } from "@/app/components/searchable-thoughts-table";

export default async function TestPage() {
  const thoughts = await GetThoughts();

  return (
    <div className={"flex flex-col items-center p-8 gap-6"}>
      <UserInfoBar/>

      <ThoughtPostBox/>
      <SearchableThoughtsTable thoughts={thoughts} />
      <Navbar/>

    </div>
  )
}
