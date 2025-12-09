'use client';

import {createClient} from "@/app/utils/supabase/client";
import {redirect} from "next/navigation";

export default function LogoutButton() {

  const logout = async() => {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/auth/login");
  }

  return (
    <button className={"glass p-2 rounded-3xl w-short max-w-4xl flex flex-col items-center gap-6"} onClick={logout}>Logout</button>
  )
}