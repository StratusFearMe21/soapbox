"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {createClient} from "@/app/utils/supabase/client";
import {Button} from "@/app/components/ui/button";
import {ThoughtPostBoxOverlay} from "@/app/components/thought-postbox-overlay";
import {SquarePen} from "lucide-react";
import {Badge} from "@/app/components/ui/badge";
import {Card} from "@/app/components/ui/card";
import {Label} from "@/app/components/ui/label";

const badgeClass = "size-4 pt-4 pb-4 w-full font-bold hover:bg-black/20 m-2 text-sm"
const transitionGroup = "transition-transform duration-500 translate-x-[-150%] group-hover:translate-x-0"

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
        setProfileLink("/login");
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

  return (
    <div
      className={"p-6 flex justify-center items-center fixed top-0 left-0 w-48"}
    >
      <ThoughtPostBoxOverlay
        isShown={isShown}
        onOpen={onOpenThoughtPostBox}
        onClose={onCloseThoughtPostBox}
      />
      <Card className={
        "flex flex-col border-4 w-full justify-center items-center p-2"
      }>

        <Badge className={badgeClass + " rounded-lg"} asChild>
          <Link href={"/feed"}>
            Feed
          </Link>
        </Badge>

        <Badge className={badgeClass + " rounded-lg"} asChild>
          <Link href={"/test"}>
            Test Page
          </Link>
        </Badge>

        <Badge className={badgeClass + " rounded-lg"} asChild>
          <Link href={profileLink}>
            {profileName}
          </Link>
        </Badge>

        <div className={"border-4 w-full m-1"}></div>

        <Button className={badgeClass + " size-4 ease-in-out hover:w-full transition-all duration-200 group"} onClick={onOpenThoughtPostBox}>
          <SquarePen className={"group-hover:opacity-0 transition-discrete duration-300"} strokeWidth={2.8}/>
          <Label className={"font-bold absolute opacity-0 group-hover:opacity-100 transition-opacity duration-75 group-hover:duration-700"}>Create Thought</Label>
        </Button>
      </Card>
    </div>
  )
}