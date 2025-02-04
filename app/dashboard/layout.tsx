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
    <main className="container pt-12 min-h-screen
    max-w-[99.5%] sm:max-w-[87.5%] mx-auto">
      <div className="flex gap-8">
        <SideNav />

        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}