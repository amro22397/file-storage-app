import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { FileIcon, StarIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideMobileNav = () => {

    const pathname = usePathname();
    console.log(pathname);


  return (
    <div className="flex  lg:hidden flex-col gap-4 h-screen w-[50%]
      absolute z-50 bg-white">
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
  )
}

export default SideMobileNav
