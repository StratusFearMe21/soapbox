import {LoginForm} from "@/components/login-form";
import Link from "next/link";

export default function Page() {
    return (
        <div>
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                    <div className="flex gap-5 items-center font-semibold">
                        <Link href="/">Home Page</Link>
                    </div>
                </div>
            </nav>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
}
