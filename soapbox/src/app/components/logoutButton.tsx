'use client';

import {createClient} from "@/app/utils/supabase/client";
import {redirect} from "next/navigation";

export default function LogoutButton() {

  const logout = async() => {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <button className={"pt-2 pb-2 pl-4 pr-4 border-4"} onClick={logout}>Logout</button>
  )
}