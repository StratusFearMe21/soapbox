'use server';

import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getThought(username: string, thought_id: string) {
  const supabase = await createClient();
  const { data: thought, error } = await supabase
    .from('thoughts_test')
    .select(`
      *,
      profile:profiles!inner ( nickname, username )
    `)
    .eq('id', thought_id)
    .eq('profile.username', username)
    .single();
  if (!error) return thought;
  //else console.log(error)
  else return null;
}

export async function getReplies(thought_id: string) {
  const supabase = await createClient();
  const { data: replies, error } = await supabase
    .from('thoughts_test')
    .select(`
      *,
      profile:profiles!inner ( nickname, username )
    `)
    .eq('parent_thought', thought_id);

  if (error) return null;
  else return replies;
}


// TODO shorten this function by simplifying to allowing all users to delete since the policies are set table-wise
export async function deleteThought(formData: FormData) {
  'use server';
  const thought_id = formData.get("thought_id");

  const supabase = await createClient();
  const {data: auth, error: auth_error} = await supabase.auth.getClaims();

  //TODO handle
  if (auth_error)  { console.log(auth_error); }

  const auth_id = auth?.claims?.user_metadata?.sub;

  const {data, error: sel_error} = await supabase
    .from("thoughts_test")
    .select()
    .eq("id", thought_id)
    .single();

  //TODO handle
  if (sel_error)  { console.log(sel_error); }

  const thought_user_id = data?.user_id;

  if (auth_id === thought_user_id) {
    const { error } = await supabase
      .from("thoughts_test")
      .delete()
      .eq('id', thought_id);

    if (error) console.log(error);

    const {data: user} = await supabase
      .from('profiles')
      .select()
      .eq('id', auth_id)
      .single()

    redirect('/user/' + user.username)
  }
}