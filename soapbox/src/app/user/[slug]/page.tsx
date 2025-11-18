import {getUserProfile, getUserPosts, getUserPostCount} from "@/app/user/actions/getUserProfile";
import {createClient} from "@/app/utils/supabase/server";
import Link from "next/link";
import {ThoughtsTable} from "@/app/components/thoughtsTable";
import styles from "../styles.module.css";

export default async function UserPage
  (
    { params, } : { params: Promise<{slug: string}> }
  )
{
  const {slug} = await params;

  const user = await getUserProfile(slug);
  const posts = await getUserPosts(slug);
  const post_count = await getUserPostCount(slug);

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



  return user ? (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="border-4 w-[20%] p-4">
        <p className={styles.nickname}>{user.nickname}</p>
        <p className={styles.username}>{user.username}</p>
        <p className={styles.bio}>{user.bio ? user.bio : null}</p>
        <p className={styles.joinDate}>Joined {user.joined}</p>
        <p className={styles.postCount}>{post_count} Thoughts</p>
      </div>
      {await checkIsOwnProfile() ? <Link className={"p-2 m-2 border-4"} href={"/user/edit"}>Edit Profile</Link> : null}
      <ThoughtsTable thoughts={posts} />
    </div>
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className={"font-bold text-4xl"}>User not found!</p>
    </div>
  )
}