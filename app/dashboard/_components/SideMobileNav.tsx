import { Button } from '@/components/ui/button'
import { AppContext } from '@/context/AppContext'
import clsx from 'clsx'
import { FileIcon, StarIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";


const SideMobileNav = () => {

    const pathname = usePathname();
    console.log(pathname);


    const { isOpenMobileNav, setIsOpenMobileNav } = useContext(AppContext);


  return (
    <div className=''>
    
    {isOpenMobileNav && (
        <div className="flex  lg:hidden flex-col gap-4 h-screen w-[50%]
     absolute z-40 bg-white">
        <IoIosCloseCircleOutline size={20} className='absolute top-[-30px] right-3 z-50
        text-red-600 cursor-pointer hover:text-red-700'
         onClick={() => setIsOpenMobileNav(false)}/>

      <Link href="/dashboard/files">
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "text-blue-500": pathname?.includes("/dashboard/files"),
          })}
        >
          <FileIcon /> All Files
        </Button>
      </Link>

      <Link href="/dashboard/favorites">
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "text-blue-500": pathname?.includes("/dashboard/favorites"),
          })}
        >
          <StarIcon /> Favorites
        </Button>
      </Link>

      <Link href="/dashboard/trash">
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "text-blue-500": pathname?.includes("/dashboard/trash"),
          })}
        >
          <TrashIcon /> Trash
        </Button>
      </Link>
    </div>
    )}
    
    </div>
    
  )
}

export default SideMobileNav
