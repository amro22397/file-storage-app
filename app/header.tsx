import { Button } from "@/components/ui/button";
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
import { redirect } from "next/navigation";


const header = () => {
  return (
    <div className="relative z-10 border-b py-4 bg-gray-50">
      <div className="items-center container mx-auto justify-between flex">
        <Link href="/" className="flex gap-2 items-center text-xl text-black">
          <Image src="/logo.png" width="50" height="50" alt="file drive logo" />
          FileDrive
        </Link>
        
        {/*  */}
        {/* if authenticated */}
          <Button variant={"outline"}>
            <Link href="/dashboard/files">Your Files</Link>
          </Button>
        

        <div className="flex gap-2">
          {/* <OrganizationSwitcher />
          <UserButton /> */}
          
          
            {/* if unauthenticated */}
              <Button onClick={() => redirect('/login')}
              >Sign In</Button>
        </div>
      </div>
    </div>
  )
}

export default header
