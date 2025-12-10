"use server";

import { SortType, SortOrder, Timeframe } from "@/app/components/sort-enums";
import {createClient} from "@/app/utils/supabase/server";

export default async function getFeedPage(page: number, followingOnly: boolean, sortType: SortType, sortOrder: SortOrder, timeframe: Timeframe) {
  // get range
  const defaultCount = 10;
  const from = defaultCount * (page - 1);
  const to = defaultCount * (page);

  // get sort params
  let sortColumn;
  let sortOptions;
  if (sortType == 0) {
    //sortColumn = "count";
    //sortOptions = { referencedTable: "like_count", ascending: sortOrder == SortOrder.ASC };
    sortColumn = "like_count_test";
    sortOptions = { ascending: sortOrder == SortOrder.ASC };
  } else {
    //date catch-all
    sortColumn = "created_at";
    sortOptions = { ascending: sortOrder == SortOrder.ASC };
  }
  //console.log(from, to, sortColumn, sortOptions);

  // figure out date
  let sinceDate = new Date();
  if (timeframe == Timeframe.ALLTIME) {
    sinceDate = new Date(0);
  } else {
    sinceDate.setDate(sinceDate.getDate() - timeframe)
  }

  const is_following_set = [true];
  if (!followingOnly) {
    is_following_set.push(false);
  }

  // do request
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("thoughts_test")
    .select(`
      *,
      profile:profiles!thoughts_test_user_id_fkey1 ( nickname, username, is_following ),
      like_count,
      is_liked,
      reply_count
    `)
    // only get non-replies
    .is("parent_thought", null)
    // only since timeframe
    .gt("created_at", sinceDate.toISOString())
    // get only thoughts from users being followed
    .in("profile.is_following", is_following_set)
    .not("profile", "is", null)
    // limit to current page range
    .range(from, to)
    // finally, sort
    .order(sortColumn, sortOptions)


  if (data) return data;
  if (error) console.log(error);
  return null;
}