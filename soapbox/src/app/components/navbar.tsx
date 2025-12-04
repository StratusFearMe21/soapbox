"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {createClient} from "@/app/utils/supabase/client";
import {Button} from "@/app/components/ui/button";
import {ThoughtPostBoxOverlay} from "@/app/components/thought-postbox-overlay";
import {ShowerHead, User, SquarePen, UserCog, LogOut} from "lucide-react";
import {Card} from "@/app/components/ui/card";
import {Label} from "@/app/components/ui/label";

const badgeClass = "  size-4  hover:w-full    bg-white/10  border "

{/*
        <Button className={badgeClass + " rounded-lg text-link bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm"} variant={"ghost"} asChild>
          <Link href={"/feed"}>
            Feed
          </Link>
        </Button>

        <Button className={badgeClass + " rounded-lg text-link bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm"} variant={"ghost"} asChild>
          <Link href={"/test"}>
            Test Page
          </Link>
        </Button>

        <Button className={badgeClass + " rounded-lg text-link bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm"} variant={"ghost"} asChild>
          <Link href={profileLink}>
            {profileName}
          </Link>
        </Button>
      */
}

export default function Navbar() {
  const [ profileName, setProfileName ] = useState('My Profile');
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
        setProfileLink("/auth/login");
      }
      if (error) console.log(error);
    }

    fetchProfileLink();
  }, [])

  const [ isShown, setIsShown ] = useState(false);

  const onOpenThoughtPostBox = async () => {
    if (!isShown) {
      setIsShown(true);
    }
  }

  const onCloseThoughtPostBox = async () => {
    if (isShown) {
      setIsShown(false);
    }
  }

  const hoverClass = "group flex flex-col items-center justify-center w-full cursor-pointer [&>*>*]:cursor-pointer m-2";
  const buttonClass = "size-4 pt-4 pb-4 group-hover:w-full group-hover:bg-white/20 font-bold rounded-lg m-0 text-sm text-link ease-in-out bg-white/10 border border-white/10 backdrop-blur-sm transition-all duration-200";
  const iconClass = "group-hover:opacity-0 transition-discrete duration-300";
  const labelClass = "font-bold absolute opacity-0 group-hover:opacity-100 transition-opacity duration-75 group-hover:duration-700";


  return (
    <div
      className={"p-6 flex justify-center items-center fixed top-0 left-0 w-48"}
    >
      <ThoughtPostBoxOverlay
        isShown={isShown}
        onClose={onCloseThoughtPostBox}
      />
      <Card className={
        "flex flex-col w-full justify-center items-center p-2 border-none shadow-none bg-transparent"
      }>

        <div className={hoverClass}>
          <Button
            className={buttonClass}
            asChild
          >
            <Link href={"/feed"}>
              <ShowerHead className={iconClass} strokeWidth={2.8}/>
              <Label className={labelClass}>Stream</Label>
            </Link>
          </Button>
        </div>

        <div className={hoverClass}>
          <Button
            className={buttonClass}
            asChild
          >
            <Link href={profileLink}>
              <User className={iconClass} strokeWidth={2.8}/>
              <Label className={labelClass}>{profileName}</Label>
            </Link>
          </Button>
        </div>

        <div className={hoverClass}>
          <Button
            className={buttonClass}
            onClick={onOpenThoughtPostBox}
            asChild
          >
            <div>
              <SquarePen className={iconClass} strokeWidth={2.8}/>
              <Label className={labelClass}>New Thought</Label>
            </div>
          </Button>
        </div>

        <div className={hoverClass}>
          <Button
            className={buttonClass}
            onClick={() => (console.log("test"))}
            asChild
          >
            <div>
              <UserCog className={iconClass} strokeWidth={2.8}/>
              <Label className={labelClass}>Edit Profile</Label>
            </div>
          </Button>
        </div>

        <div className={hoverClass}>
          <Button
            className={buttonClass}
            onClick={() => (console.log("test"))}
            asChild
          >
            <div>
              <LogOut className={iconClass} strokeWidth={2.8}/>
              <Label className={labelClass}>Log Out</Label>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  )
}