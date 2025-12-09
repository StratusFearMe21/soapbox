"use client";

import EditProfile from "@/app/components/settings/edit-profile";
import useMetadata from "@/app/utils/useMetadata";

export default function EditProfilePage() {
  useMetadata("Edit Profile | Soapbox");

  return (
    <div>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <EditProfile></EditProfile>
        </div>
      </div>
    </div>
  )
}