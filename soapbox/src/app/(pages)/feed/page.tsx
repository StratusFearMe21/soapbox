"use client";

import Link from "next/link";
import styles from "../styles.module.css";
import ThoughtCard from "@/app/components/thought-card";
import {Profile, Thought} from "@/app/components/thought"
import {useEffect, useState} from "react";
import formatDate from "@/app/utils/formatDate";
import {getProfile} from "@/app/user/actions/getFullProfile";
import {getIsLikeds} from "@/app/utils/likeActions";
import { GetThoughts } from "@/app/test/actions/getThoughts";

export default function FeedPage()
{
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ thoughts, setThoughts ] = useState<any[] | null>(null)

  useEffect(() => {
    const fetchThoughts= async () => {
      const thoughts = await GetThoughts();
      setThoughts(thoughts);
      console.log(thoughts);
      setLoading(false);
    };
    fetchThoughts();
  }, []);

  return loading ? (
    <div></div>
  ) : (
    <div className="w-screen min-h-screen flex flex-col items-center overflow-y-auto overflow-x-hidden pt-10 pb-20">

      <div className={"flex flex-col items-center w-full max-w-2xl px-4"}>
        <p className={"text-center font-bold"}></p>

        <div className="w-full flex flex-col items-center gap-4">
          {thoughts?.map((thought) => (
            <ThoughtCard key={thought.id} thought={thought} nickname={ thought.profiles.nickname ? thought.profiles.nickname : '' } username={ thought.profiles.username ? thought.profiles.username : '' } />
          ))}
        </div>
      </div>

    </div>
  ) 
}
