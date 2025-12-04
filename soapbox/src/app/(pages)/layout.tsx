import Navbar from "@/app/components/navbar";

export default function UserLayout(
  {
    children,
  } : {
    children: React.ReactNode;
  }) {
  return (
    <div>
      {children}
      <Navbar/>
    </div>
  )
}