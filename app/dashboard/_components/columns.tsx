"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { formatRelative } from "date-fns";
// import { useQuery } from "convex/react";
// import { api } from "../../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FileCardActions from "./file-actions";


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
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "type",
        header: "Type",
    },


    {
        header: "User",
    cell: ({ row }) => {
      return (
        <UserCell userId="" />
      )
    }
    },


    {
        header: "Uploaded On",
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
            <FileCardActions isFavorited={file.isFavorited} file={file} />
        </div>
      )
    }
    }

]

 
