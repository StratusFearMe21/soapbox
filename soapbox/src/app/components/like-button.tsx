"use client";

import {useState} from "react";
import {invertLike} from "@/app/utils/likeActions";
import {Button} from "@/app/components/ui/button";

interface LikeButtonThoughts {
  thought_id: string,
  is_liked: boolean,
  likeChangeFunction: (increase: boolean) => void;
}

export default function LikeButton({thought_id, is_liked, likeChangeFunction}: LikeButtonThoughts) {
  const [isLiked, setIsLiked] = useState(is_liked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeClick = async () => {
    setIsLoading(true);

    const is_now_liked = await invertLike(thought_id, isLiked);
    console.log("is_now_liked: " + is_now_liked);
    // if the new value is diff to old
    if (is_now_liked != isLiked) {
      // then the new value should indicate ...
      // increase if true
      // decrease if false
      likeChangeFunction(is_now_liked)
      setIsLiked(is_now_liked);
    }

    setIsLoading(false);
  }

  return (
    <Button
      className={"absolute bottom-0 right-0 text-xs w-fit h-6"}
      disabled={isLoading}
      variant={"glass"}
      onClick={handleLikeClick}
    >
      {isLiked ? "Unlike" : "Like"}
    </Button>
  )
}