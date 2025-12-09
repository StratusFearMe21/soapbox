"use client";

import { UpdatePasswordForm } from "@/app/components/auth/update-password-form";
import useMetadata from "@/app/utils/useMetadata";

export default function Page() {
  useMetadata("Update Password | Soapbox")

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
