import { createClient } from "@/app/utils/supabase/server";
import LogoutButton from "@/app/components/logoutButton";


export async function UserInfoBar() {
  const supabase = await createClient();
  const {data: {user}, error} = await supabase.auth.getUser()

  return user ? (
    <div className={"flex flex-col items-center justify-center"}>
      <p>{user.email + " - " + user.id}</p>
      <LogoutButton/>
    </div>
  ) : (
    <div>
      <p>signed out</p>
    </div>
  )
}