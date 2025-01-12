// import { Doc, Id } from "../../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileIcon,
  MoreVertical,
  StarHalf,
  StarIcon,
  TrashIcon,
  UndoIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
// import { useMutation, useQuery } from "convex/react";
// import { api } from "../../../../convex/_generated/api";
// import { Protect } from "@clerk/nextjs";

import React from 'react'
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { UploadedFile } from "./file-browser";

const FileCardActions = ({
    file,
    isFavorited,
  }: {
    file: UploadedFile & { url: string | null };
    isFavorited: boolean;
  }) => {

    // const { toast } = useToast();

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);


    const handleDeleteFile = async (id: string) => {

      setDeleteLoading(true);

      const res = await axios.delete(`/api/upload/${id}`);

      if (res.data) {
        toast({
          variant: "default",
          title: "File is deleted",
        });
      }

      window.location.reload();

      setDeleteLoading(false);

    }

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark the file for our deletion process. Files are
              deleted periodically
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeleteFile(file._id);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              if (!file.url) return;
              window.open(file.url, "_blank");
            }}
            className="flex gap-1 items-center cursor-pointer"
          >
            <FileIcon className="w-4 h-4" /> Download
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
            //   toggleFavorite({
            //     fileId: file._id,
            //   });
            }}
            className="flex gap-1 items-center cursor-pointer"
          >
            {isFavorited ? (
              <div className="flex gap-1 items-center">
                <StarIcon className="w-4 h-4" /> Unfavorite
              </div>
            ) : (
              <div className="flex gap-1 items-center">
                <StarHalf className="w-4 h-4" /> Favorite
              </div>
            )}
          </DropdownMenuItem>

          {/* <Protect
            condition={(check) => {
              return (
                check({
                  role: "org:admin",
                }) || file.userId === me?._id
              );
            }}
            fallback={<></>}
          > */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (false /*file.shouldDelete*/) {
                //   restoreFile({
                //     fileId: file._id,
                //   });
                } else {
                  setIsConfirmOpen(true);
                }
              }}
              className="flex gap-1 items-center cursor-pointer"
            >
              {false /* file.shouldDelete */ ? (
                <div className="flex gap-1 text-green-600 items-center cursor-pointer">
                  <UndoIcon className="w-4 h-4" /> Restore
                </div>
              ) : (
                <div className="flex gap-1 text-red-600 items-center cursor-pointer">
                  <TrashIcon className="w-4 h-4" /> Delete
                </div>
              )}
            </DropdownMenuItem>
          {/* </Protect> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default FileCardActions
