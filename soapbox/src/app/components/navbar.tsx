"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {createClient} from "@/app/utils/supabase/client";
import {Button} from "@/app/components/ui/button";
import {ThoughtPostBoxOverlay} from "@/app/components/thought-postbox-overlay";
import {ShowerHead, User, SquarePen, UserCog, LogOut} from "lucide-react";
import {Card} from "@/app/components/ui/card";
import {Label} from "@/app/components/ui/label";
import {getCurrentUsername} from "@/app/utils/getCurrentUserId";
import {redirect} from "next/navigation";

export default function Navbar() {
  const [ profileName, setProfileName ] = useState('My Profile');
  const [ profileLink, setProfileLink ] = useState('/login');

  useEffect(() => {
    const fetchProfileLink = async () => {
      const username = await getCurrentUsername()
      if (username) {
        setProfileLink("/user/" + username);
      } else {
        setProfileName("Login")
        setProfileLink("/auth/login");
      }
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

  const onSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/auth/login");
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
            <Link href={"/stream"}>
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
            asChild
          >
            <Link href={"/settings/profile"}>
              <UserCog className={iconClass} strokeWidth={2.8}/>
              <Label className={labelClass}>Edit Profile</Label>
            </Link>
          </Button>
        </div>

        <div className={hoverClass}>
          <Button
            className={buttonClass}
            onClick={onSignOut}
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