"use client";

import {useState} from "react";
import {invertFollow} from "@/app/utils/followActions";
import {Button} from "@/app/components/ui/button";

interface FollowButtonThoughts {
  user_id: string,
  is_followed: boolean,
  followChangeFunction: (increase: boolean) => void;
}

export default function FollowButton({user_id, is_followed, followChangeFunction}: FollowButtonThoughts) {
  const [isLoading, setIsLoading] = useState(false);

  //console.log(thought_id + ": " + is_followed)

  const handleFollowClick = async () => {
    setIsLoading(true);

    const is_now_followed = await invertFollow(user_id, is_followed);
    //console.log("is_now_followed: " + is_now_followed);

    // if the new value is diff to old
    if (is_now_followed != is_followed) {
      // then the new value should indicate ...
      // increase if true
      // decrease if false
      followChangeFunction(is_now_followed)
    }

    setIsLoading(false);
  }

  return (
    <Button
      className={"text-xs w-fit h-6"}
      disabled={isLoading}
      variant={"glass"}
      onClick={handleFollowClick}
    >
      {is_followed ? "Unfollow" : "Follow"}
    </Button>
  )
}
