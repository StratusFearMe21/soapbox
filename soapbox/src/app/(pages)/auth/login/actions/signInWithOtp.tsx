import { supabase } from "@/app/utils/supabase/client"

export async function signInWithOtp(formData: FormData) {
  let email = formData.get("email");

  if (email !== null) {
    email = email.toString();

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/test`
      }
    });

    console.log(data);
    console.log(error);
  }
}
