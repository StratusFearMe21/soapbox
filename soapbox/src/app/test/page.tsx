'use server';
import { UserInfoBar } from "@/app/components/temp/userInfoBar";
import { GetThoughts } from "@/app/test/actions/getThoughts";
import ThoughtPostBox from "@/app/components/temp/thoughtPostBox";
import Navbar from "@/app/components/navbar";
import { SearchableThoughtsTable } from "@/app/components/temp/searchable-thoughts-table";

export default async function TestPage() {
  const thoughts = await GetThoughts();

  return (
    <div className={"flex flex-col items-center min-h-screen p-8 gap-8 pt-24"}>
      <div className="glass p-6 rounded-2xl w-full max-w-4xl flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-white/90">Test Console</h1>
        <UserInfoBar/>
        <ThoughtPostBox/>
        <SearchableThoughtsTable thoughts={thoughts} />
      </div>
      <Navbar/>
    </div>
  )
}
