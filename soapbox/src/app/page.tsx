"use client";

import { ThemeSwitcher } from "@/app/components/theme-switcher";
import Link from "next/link";
import MetadataComponent from "@/app/utils/MetadataComponent";
import Loading from "@/app/components/loading";
import {useEffect} from "react";
import {redirect} from "next/navigation";

function oldHome() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <MetadataComponent title={"Soapbox"}/>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href="/">Home Page</Link>
            </div>
          </div>
        </nav>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}

export default function Home() {
  useEffect(() => {
    redirect("/stream")
  }, []);

  return (
    <div>
      <Loading/>
    </div>
  )
}