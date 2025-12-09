"use client";

import { SignUpForm } from "@/app/components/auth/sign-up-form";
import useMetadata from "@/app/utils/useMetadata";

export default function Page() {
  useMetadata("Sign-Up | Soapbox");

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
