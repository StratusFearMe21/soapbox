"use client";

import {LoginForm} from "@/app/components/auth/login-form";
import useMetadata from "@/app/utils/useMetadata";

export default function Page() {
  useMetadata("Login | Soapbox");

    return (
        <div>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
}
