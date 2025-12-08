'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/components/ui/card";
import {Label} from "@/app/components/ui/label";
import {Input} from "@/app/components/ui/input";
import {Textarea} from "@/app/components/ui/textarea";
import {Button} from "@/app/components/ui/button";
import {useEffect, useState} from "react";
import {getCurrentUserId} from "@/app/utils/getCurrentUserId";
import {createClient} from "@/app/utils/supabase/client";
import {updateProfile} from "@/app/utils/updateProfile";
import {redirect} from "next/navigation";

export default function EditProfile() {
  const [ loading, setLoading ] = useState(true);
  const [ nickname, setNickname ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ bio, setBio ] = useState("");
  const [ error, setError ] = useState("");
  //const [ hasProfile, setHasProfile ] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      const supabase = createClient();
      const user_id = await getCurrentUserId();
      const { data: user } = await supabase
        .from('profiles')
        .select()
        .eq('id', user_id)
        .single()

      if (user) {
        //setHasProfile(true);
        setNickname(user.nickname);
        setUsername(user.username);
        setBio(user.bio ? user.bio : '');
      }

      setLoading(false);
    }

    fetchProfileData();
  }, []);

  const onUpdateProfile = async () => {
    setLoading(true);
    if (nickname && username) {
      const profileInfo = {
        nickname: nickname,
        username: username,
        bio: bio,
      }

      const result = await updateProfile(profileInfo);

      if (result) redirect("/user/" + username);
      return;
    }

    setError("Error updating profile!");
    setLoading(false);
  }

  return !loading ? (
    <Card className={"flex flex-col"}>
      <CardHeader>
        <CardTitle className={"text-center text-2xl"}>Edit Profile</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label className={"w-full"}>Nickname</Label>
            <Input
              id={"nickname"}
              type={"text"}
              placeholder={"Nickname"}
              required
              value={nickname}
              onChange={(e) => {setNickname(e.target.value)}}
            />
          </div>

          <div className="grid gap-2">
            <Label>Username</Label>
            <Input
              id={"username"}
              type={"text"}
              placeholder={"Username"}
              required
              value={username}
              onChange={(e) => (setUsername(e.target.value))}
            />
          </div>

          <div className="grid gap-2">
            <Label>Bio</Label>
            <Textarea
              className={"resize-none"}
              id={"bio"}
              placeholder={"Write about yourself here!"}
              maxLength={128}
              required
              value={bio}
              onChange={(e) => {setBio(e.target.value)}}
            ></Textarea>
          </div>

            <Button
              variant={"glass"}
              onClick={onUpdateProfile}
              disabled={nickname.length == 0 || username.length == 0}
            >
              Update Profile
            </Button>
          {error ? <div>{error}</div> : null}
        </div>
      </CardContent>
    </Card>
  ) : null
}