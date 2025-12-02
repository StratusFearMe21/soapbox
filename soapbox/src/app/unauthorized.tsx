import LoginButton from "@/app/components/loginButton";

export default function Unauthorized() {
  return (
    <main>
      <h1>Unauthorized</h1>
      <p>You must be logged in!</p>
      <LoginButton />
    </main>
  )
}