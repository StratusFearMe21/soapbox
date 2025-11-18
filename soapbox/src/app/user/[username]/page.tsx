import {getUserProfile, getUserPosts, getUserPostCount} from "@/app/user/actions/profileActions";
import {createClient} from "@/app/utils/supabase/server";
import Link from "next/link";
import styles from "../styles.module.css";
import ThoughtCard from "@/app/components/thought-card";

export default async function UserPage
  (
    { params, } : { params: Promise<{username: string}> }
  )
{
  const {username} = await params;

  const user = await getUserProfile(username);
  const thoughts = await getUserPosts(username);
  const post_count = await getUserPostCount(username);

  // format date
  if (user) {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    user.joined = new Intl.DateTimeFormat(navigator.language, options).format(new Date(user.created_at));
  }

  const checkIsOwnProfile = async () => {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims()
    const user_id = data?.claims?.user_metadata?.sub;
    return user.id == user_id;
  }

  //<!-- <ThoughtsTable thoughts={posts} /> -->


  return user ? (
    <div className="w-screen h-fit flex flex-col items-center overflow-y-auto overflow-x-hidden">
      {await checkIsOwnProfile() ? <Link className={"fixed bottom-0 left-0 border-4 p-4 m-4 font-bold"} href={"/user/edit"}>Edit Profile</Link> : null}

      <div className={"border-4"}>
        <div className="border-b-4 w-96 p-4">
          <p className={styles.nickname}>{user.nickname}</p>
          <p className={styles.username}>@{user.username}</p>
          <p className={styles.bio}>{user.bio ? user.bio : null}</p>
          <p className={styles.joinDate}>Joined {user.joined}</p>
          <p className={styles.postCount}>{post_count} Thoughts</p>
        </div>

        <p className={"text-center font-bold"}></p>

        <div>
          {thoughts?.map((thought) => (
            <ThoughtCard key={thought.id} thought={thought} />
          ))}
        </div>
      </div>

    </div>
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className={"font-bold text-2xl"}>User not found!</p>
    </div>
  )
}