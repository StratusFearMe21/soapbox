"use client";

import { ForgotPasswordForm } from "@/app/components/auth/forgot-password-form";
import useMetadata from "@/app/utils/useMetadata";

export default function Page() {
  useMetadata("Forgot Password | Soapbox")

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
