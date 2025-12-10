"use client";

import Loading from "@/app/components/loading";
import { createClient } from "@/app/utils/supabase/client";
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from "react";

function Confirm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    async function confirmEmail() {
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
              { id: user.id, created_at: new Date().toISOString(), last_edited: new Date().toISOString(), username: searchParams.get("username"), nickname: searchParams.get("nickname"), bio: null }
            ])

          if (error) throw error;

          router.push("/test")
        }
      }
    }
    confirmEmail()
  }, [router, searchParams, supabase])

  return (<Loading />)
}

export default function ConfirmHtml() {
  return (
    <Suspense>
      <Confirm />
    </Suspense>
  )
}
