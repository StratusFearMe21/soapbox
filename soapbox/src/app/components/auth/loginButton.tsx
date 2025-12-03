import Link  from "next/link";

export default function LoginButton() {
  return (
    <Link href={"/auth/login"}>Login</Link>
  )
}