"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {createClient} from "@/app/utils/supabase/client";
import {Button} from "@/app/components/ui/button";
import {ThoughtPostBoxOverlay} from "@/app/components/thought-postbox-overlay";

const linkClass = "pt-4 pb-4 text-center w-full font-bold transition-colors duration-350 hover:bg-slate-900"
const buttonClass = linkClass + " ";
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
        const {data: username} = await supabase
          .rpc('get_username_from_id', { user_id_input: user_id })
        setProfileLink("/user/" + username);
      } else {
        setProfileName("Login")
        setProfileLink("/login");
      }
    }

    fetchProfileLink();
  }, [])

  const [ isShown, setIsShown ] = useState(false);

  const onOpenThoughtPostBox = async () => {
    console.log("test on show post box")

    if (!isShown) {
      setIsShown(true);
    }
  }

  const onCloseThoughtPostBox = async () => {
    console.log("test on close post box")

    if (isShown) {
      setIsShown(false);
    }
  }

  return (
    <div
      className={"p-6 flex justify-center items-center fixed top-0 left-0 w-48"}
    >
      <ThoughtPostBoxOverlay
        isShown={isShown}
        onOpen={onOpenThoughtPostBox}
        onClose={onCloseThoughtPostBox}
      />
      <div className={
        "flex flex-col justify-center items-start border-4 w-full bg-background"
      }>
        <Link className={linkClass} href="/">Feed (blank)</Link>
        <Link className={linkClass} href="/test">Posting Test</Link>
        <Link className={linkClass} href={profileLink}>{profileName}</Link>
        <Button className={linkClass} onClick={onOpenThoughtPostBox}>+</Button>
      </div>
    </div>
  )
}