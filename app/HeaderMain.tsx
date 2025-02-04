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

import { redirect, usePathname, useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import clsx from "clsx";
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";
import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";

const Header = ({ session }: { session: any }) => {


  const { isOpenMobileNav, setIsOpenMobileNav } = useContext(AppContext);


  const router = useRouter();

  const pathname = usePathname();
    console.log(pathname);

  // const session = useSession();

  // console.log(session);

  return (
    <div
      className="relative z-10 border-b py-4 bg-gray-50
    px-[8.5px] sm:px-0 "
    >
      <div className="items-center container justify-between flex
      max-w-[99.5%] sm:max-w-[87.5%] mx-auto">
        <Link href="/" className="flex gap-2 items-center text-xl text-black">
          <Image src="/logo.png" width="50" height="50" alt="file drive logo" />
          FileDrive
        </Link>

        {session?.user?.email && (
          <Button variant={"outline"} className="hidden">
            <Link href="/dashboard/files">Your Files</Link>
          </Button>
        )}

        <div className="flex gap-2 items-center">
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

          <AiOutlineMenu onClick={() => {
            setIsOpenMobileNav(!isOpenMobileNav);
          }}
          className="mx-2 lg:hidden cursor-pointer" size={30} />
        </div>
      </div>


      
    </div>
  );
};

export default Header;
