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
    <button className={"bottom-0 right-0 m-4 border border-white/30 rounded-full px-4 py-1 glass hover:bg-white/20 active:bg-white/30 transition-all text-xs font-semibold uppercase tracking-wider"}
            onClick={logout}>Logout</button>
  )
}