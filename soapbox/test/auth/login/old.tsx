'use client';

import { useState } from "react";
import { createClient } from "@/app/utils/supabase/client";
import {redirect, usePathname} from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
    if (!error) redirect("/test");
  };

    return (
      <div className={"flex flex-col justify-center items-center h-screen"}>
        <form onSubmit={handleLogin} className="flex flex-col">
          <label htmlFor="email" className="">Email</label>
          <input id="email" type="email" name="email" placeholder="name@example.com"
                 className="border-2 pl-2 pr-2 pt-1 pb-1"
                 onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="">Password</label>
          <input id="password" type="password" name="password" placeholder="Password"
                  className="border-2 pl-2 pr-2 pt-1 pb-1"
                  onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <input type="submit" className="border-2 pl-2 pr-2 pt-1 pb-1 m-4" disabled={isLoading}/>
        </form>

      </div>
    )
}