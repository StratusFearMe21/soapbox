import {createClient} from "@/app/utils/supabase/server";

export async function getPost(post_id: string) {
  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from('thoughts_test')
    .select(`
      *,
      profile:profiles!inner ( nickname, username )
    `)
    .eq('id', post_id)
    .single();
  if (!error) return post;
  //else console.log(error)
  else return null;
}