"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { formatRelative } from "date-fns";
// import { useQuery } from "convex/react";
// import { api } from "../../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FileCardActions from "./file-actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FileIcon } from "lucide-react";


function UserCell({ userId }: { userId: string }) {
    return (
        <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src={'' /* userProfile?.image */} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* {userProfile?.name} */}
        </div>
      );
}

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "type",
        header: "Type",
    },

    

    // {
    //     accessorKey: "emailRef",
    //     header: "User",
    // // cell: ({ row }) => {
    // //   return (
    // //     <UserCell userId="" />
    // //   )
    // // }
    // },


    {
        header: "Uploaded On",
    cell: ({ row }) => {
      return (
        <div className="text-xs text-gray-700">
                    Uploaded on {formatRelative(new Date(row.original.createdAt), new Date())}
                  </div>

        // <div className="text-right font-medium">
        //     <FileCardActions isFavorited={row.original.isFavorited} file={row.original.file} />
        // </div>
      )
    }
    },

    {
      header: "Download",
      cell: ({ row }) => {
        return (
              <div onClick={() => {
                if (!row.original.file) return;
                window.open(row.original.file, "_blank");
              }}
              className="flex gap-1 items-center cursor-pointer">
              <FileIcon className="w-4 h-4"
               /> Download
              </div>
        )
      }
  },

]

 
