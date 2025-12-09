"use client";

import ThoughtCard from "@/app/components/thought-card";
import {Thought} from "@/app/components/thought"
import {useEffect, useState} from "react";
import useMetadata from "@/app/utils/useMetadata";
import Loading from "@/app/components/loading";
import getFeedPage from "@/app/utils/getFeedPage";
import {SortOrder, SortType, Timeframe} from "@/app/components/sort-enums";


export default function StreamPage()
{
  const [ thoughts, setThoughts ] = useState<Thought[] | null>(null);

  const [ sortType, setSortType ] = useState(SortType.LIKES);
  const [ sortOrder, setSortOrder ] = useState(SortOrder.DESC);
  const [ timeframe, setTimeframe ] = useState(Timeframe.WEEK);

  const [ page, setPage ] = useState(1);

  const [ loading, setLoading ] = useState<boolean>(true);

  useMetadata("Thought Stream | Soapbox")

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      const thoughts = await getFeedPage(page, sortType, sortOrder, timeframe)
      setThoughts(thoughts)
      setLoading(false);
    }
    fetchFeed();
  }, [page, sortType, sortOrder, timeframe]);

  const updateSort = async () => {

  }

  return loading ? (
    <Loading/>
  ) : (thoughts) ? (

    <div className="w-screen min-h-screen flex flex-col items-center overflow-y-auto overflow-x-hidden pt-10 pb-20">


      <div className="w-xl flex flex-col items-center gap-4">
        {thoughts.map((thought) => (
          <ThoughtCard key={thought.id} thought={thought} nickname={ thought.profile?.nickname ? thought.profile.nickname : '' } username={ thought.profile?.username ? thought.profile.username : '' } />
        ))}
      </div>
    </div>

  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className={"font-bold text-2xl"}>no thoughts to display!</p>
    </div>
  )
}
