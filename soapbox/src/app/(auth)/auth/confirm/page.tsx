"use client";

import { createClient } from "@/app/utils/supabase/client";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default async function Confirm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  let user = null;

  {
    let { data, error } = await supabase.auth.getUser();

    if (error) throw error;
    if (data.user == null) router.push("/auth/login")

    user = data.user;
  }

  {
    if (user == null) {
      router.push("/auth/login")
    } else {
      let { data, error } = await supabase
        .from('profiles')
        .insert([
          { id: user.id, created_at: Date.now(), last_edited: Date.now(), username: searchParams.get("uesrname"), nickname: searchParams.get("nickname"), bio: null }
        ])

      if (error) throw error;

      router.push("/test")
    }
  }
}
