"use client";

import {createClient} from "@/app/utils/supabase/client";
import EditUserProfile from "@/app/user/actions/editUserProfile";
import { useEffect, useState } from "react";

const labelClass = "font-bold mt-4 w-full"
const textInputClass = "border-2 pl-2 pr-2 pt-1 pb-1 w-full"
const textAreaClass = "resize-none " + textInputClass

export default function EditProfilePage() {
  const [ nickname, setNickname ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ bio, setBio ] = useState('')
  const [ loading, setLoading ] = useState(true);
  const [ message, setMessage ] = useState<string | null>(null);

  // fetching user data on load
  useEffect(() => {
    const fetchUserData = async() => {
      try {
        const supabase = createClient();
        const {data} = await supabase.auth.getClaims();
        const user_id: string = data?.claims?.user_metadata?.sub;
        const { data: user } = await supabase
          .from('profiles')
          .select()
          .eq('id', user_id)
          .single()

        setUsername(user.username)
        setNickname(user.nickname)
        setBio(user.bio ? user.bio : '')
      } catch (error) {

      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  // saving user profile data
  const saveUserProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = {
      nickname,
      username,
      bio
    }
    const error = await EditUserProfile(user)
    setMessage(error ? handleError(error) : "Profile successfully updated!")
    setLoading(false)
  }

  // specific error handling
  const handleError = (error: {error: string, message: string}) => {
    if (error.error == "23505") return "Username already exists!"
    else return error.message;
  }

  return (
    <div className={"w-screen h-screen flex items-center justify-center"}>
      <form
        onSubmit={saveUserProfile}
        className={"flex flex-col w-72 items-center justify-center"}
      >
        <label htmlFor="nickname" className={labelClass}>Nickname</label>
        <input
          id="nickname"
          name="nickname"
          type={"text"}
          className={textInputClass}
          placeholder="Nickname"
          maxLength={32}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <label htmlFor="username" className={labelClass}>Username</label>
        <input
          id="username"
          name="username"
          type={"text"}
          className={textInputClass}
          placeholder="Username"
          maxLength={32}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="bio" className={labelClass}>Bio</label>
        <textarea
          id="bio"
          name="bio"
          className={textAreaClass}
          rows={3}
          maxLength={128}
          placeholder="Enter some information about you here..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>

        {message ? <p>{message}</p> : null}

        <input
          type={"submit"}
          className={"mt-4 pt-1 pb-1 border-4 w-32"}
          disabled={loading}
        />
      </form>
    </div>
  )
}