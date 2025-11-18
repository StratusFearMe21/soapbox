import {createClient} from "@/app/utils/supabase/server";

export async function getUserProfile(slug: string) {
  const supabase = await createClient();
  const { data: user } = await supabase
    .from('profiles')
    .select()
    .eq('username', slug)
    .single()

  return user
}

export async function getUserPosts(slug: string) {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("thoughts_test")
    .select(`
      *,
      profile:profiles!inner ( nickname, username )
    `)
    .eq('profiles.username', slug)

  //console.log(posts)

  if (error) console.log(error);
  if (!error) return posts
}

export async function getUserPostCount(slug: string) {
  const supabase = await createClient();
  const {data: post_count, error} = await supabase.rpc('get_thoughts_count', { username_input: slug})
  if (error) console.log(error);
  if (!error) return post_count
}

