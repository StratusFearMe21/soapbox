"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {createClient} from "@/app/utils/supabase/client";

const linkClass = "pt-4 pb-4 text-center w-full font-bold transition-colors duration-350 hover:bg-slate-900"
const transitionGroup = "transition-transform duration-500 translate-x-[-150%] group-hover:translate-x-0"

export default function Navbar() {
  const [ profileName, setProfileName ] = useState('Profile');
  const [ profileLink, setProfileLink ] = useState('/login');

  useEffect(() => {
    const fetchProfileLink = async () => {
      const supabase = createClient();
      const {data, error} = await supabase.auth.getClaims();
      const user_id = data?.claims?.user_metadata?.sub;
      if (user_id) {
        const {data: user} = await supabase
          .from('profiles')
          .select()
          .eq('id', user_id)
          .single()
        setProfileLink("/user/" + user.username);
      } else {
        setProfileName("Login")
        setProfileLink("/login");
      }
    }

    fetchProfileLink();
  }, [])

  return (
    <div
      className={"p-6 flex justify-center items-center absolute top-0 left-0 w-48"}
    >
      <div className={
        "flex flex-col justify-center items-start border-4 w-full bg-background"
      }>
        <Link className={linkClass} href="/">Home</Link>
        <Link className={linkClass} href="/test">Test</Link>
        <Link className={linkClass} href={profileLink}>{profileName}</Link>
      </div>
    </div>
  )
}