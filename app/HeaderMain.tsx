"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
/* import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useSession,
} from "@clerk/nextjs"; */
import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { redirect, useRouter } from "next/navigation";



const Header = ({ session }: { session: any }) => {
  const router = useRouter();

  // const session = useSession();

  // console.log(session);

  return (
    <div className="relative z-10 border-b py-4 bg-gray-50">
      <div className="items-center container mx-auto justify-between flex">
        <Link href="/" className="flex gap-2 items-center text-xl text-black">
          <Image src="/logo.png" width="50" height="50" alt="file drive logo" />
          FileDrive
        </Link>

        {session?.user?.email && (
          <Button variant={"outline"} className="hidden">
            <Link href="/dashboard/files">Your Files</Link>
          </Button>
        )}

        <div className="flex gap-2">
          {/* <OrganizationSwitcher />
          <UserButton /> */}

          {!session?.user?.email && (
                <Button
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Sign In
                </Button>
              )}

              

          {session?.user?.email && (
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src={
                      session.user?.image ||
                      "blank-profile-picture-973460_1280.webp"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent
                className="px-2 pb-2 pt-0 bg-white rounded-md shadow-lg
                flex flex-col justify-center items-center"
              >
                <span className="px-2 py-4 text-sm text-gray-500">
                  {session?.user?.email}
                </span>

                <Button
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                  variant="outline"
                  className="bg-red-500 hover:bg-red-600 active:bg-red-700
                   text-white hover:text-white active:text-white text-sm"
                >
                  Sign Out
                </Button>
              </PopoverContent>
            </Popover>
          )}


        </div>
      </div>
    </div>
  );
};

export default Header;
