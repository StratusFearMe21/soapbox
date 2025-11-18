import {createClient} from "@/app/utils/supabase/server";

export async function getUserProfile(username: string) {
  const supabase = await createClient();
  const { data: user } = await supabase
    .from('profiles')
    .select()
    .eq('username', username)
    .single()

  return user
}

export async function getUserPosts(username: string) {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("thoughts_test")
    .select(`
      *,
      profile:profiles!inner ( nickname, username )
    `)
    .eq('profiles.username', username)

  //console.log(posts)

  if (error) console.log(error);
  if (!error) return posts
}

export async function getUserPostCount(username: string) {
  const supabase = await createClient();
  const {data: post_count, error} = await supabase.rpc('get_thoughts_count', { username_input: username})
  if (error) console.log(error);
  if (!error) return post_count
}

