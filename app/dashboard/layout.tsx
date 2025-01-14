// import { SideNav } from "./side-nav";

import { getSession } from "@/actions/getUser";
import SideNav from "./side-nav";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession();
    console.log(session?.user?.email)

    if (!session?.user?.email) {
      redirect('/login');
    }

  return (
    <main className="container mx-auto pt-12 min-h-screen">
      <div className="flex gap-8">
        <SideNav />

        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}