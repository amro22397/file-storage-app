"use client";

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
  Loader2,
  MoreVertical,
  StarHalf,
  StarIcon,
  TrashIcon,
  UndoIcon,
} from "lucide-react";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

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

import React from "react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { UploadedFile } from "./file-browser";
import { usePathname } from "next/navigation";

const FileCardActions = ({
  file,
  isFavorited,
  fetchFiles,
  fetchTrash,
  fetchFav,
}: {
  file: UploadedFile;
  isFavorited: boolean;
  fetchFiles?: any;
  fetchTrash?: any
  fetchFav?: any;
}) => {
  // const { toast } = useToast();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isDeletePermenantly, setIsDeletePermenantly] = useState(false);

  const [trashLoading, setTrashLoading] = useState(false);

  const pathname = usePathname();

  const handleFavourite = async (id: string) => {
    const res = await axios.put(`/api/upload/favourite/${id}`);

    if (pathname?.includes("files")) {
      fetchFiles();
    }

    if (pathname?.includes("favorites")) {
      fetchFav();
    }

    if (res.data.success) {
      toast({
        title: res.data.message,
      });

    }
  };

  const handleTrashFile = async (id: string) => {
    setTrashLoading(true);

    const res = await axios.put(`/api/upload/trash/${id}`);

    setTrashLoading(false);
    setIsConfirmOpen(false);

    if (pathname?.includes("files")) {
      fetchFiles();
    }

    if (pathname?.includes("favorites")) {
      fetchFav();
    }

    if (res.data.success) {
      toast({
        title: res.data.message,
      });

      
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);
    }
  };

  const handleRestoreFile = async (id: string) => {
    const res = await axios.put(`/api/upload/restore/${id}`);

    fetchTrash();

    if (res.data.success) {
      toast({
        className: "bg-green-500 text-white border-none",
        title: res.data.message,
      });
    }

    
  };

  const handleDeleteFile = async (id: string) => {

    setDeleteLoading(true);

    const res = await axios.delete(`/api/upload/${id}`);

    setDeleteLoading(false);
    setIsDeletePermenantly(false)

    fetchTrash();

    if (res.data.success) {
      toast({
        variant: "destructive",
        title: res.data.message,
      });
    }
  };

  return (
    <>
      <AlertDialog
        open={isConfirmOpen}
        onOpenChange={() => setIsConfirmOpen(true)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to trash the file?
            </AlertDialogTitle>
            <AlertDialogDescription>
              The action will move the file to the trash. If you want to
              permenantly delete the file, delete it from the trash.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleTrashFile(file._id);

                // if (file.isTrash && pathname?.includes("trash")) {
                //   handleRestoreFile(file._id);
                // } else {

                // }
                // handleDeleteFile(file._id);
              }}
            >
              {trashLoading ? <Loader2 className="animate-spin" /> : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>



      <AlertDialog
        open={isDeletePermenantly}
        onOpenChange={() => setIsDeletePermenantly(true)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this file permenantly?
            </AlertDialogTitle>
            <AlertDialogDescription>
              The action will delete the file permenantly. You will not be able
              to restore the file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeleteFile(file._id);
              }}
            >
              {deleteLoading ? <Loader2 className="animate-spin" /> : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {file.isTrash !== true && !pathname?.includes("trash") && (
            <DropdownMenuItem
              onClick={() => {
                if (!file.file) return;
                window.open(file.file, "_blank");
              }}
              className="flex gap-1 items-center cursor-pointer"
            >
              <FileIcon className="w-4 h-4" /> Download
            </DropdownMenuItem>
          )}

          {file.isTrash !== true && !pathname?.includes("trash") && (
            <DropdownMenuItem
              onClick={() => {
                handleFavourite(file._id);

                //   toggleFavorite({
                //     fileId: file._id,
                //   });
              }}
              className="flex gap-1 items-center cursor-pointer"
            >
              {file.isFavorite ? (
                <div className="flex gap-1 items-center">
                  <FaRegStar className="w-4 h-4" /> Unfavorite
                </div>
              ) : (
                <div className="flex gap-1 items-center">
                  <FaStar className="w-4 h-4" /> Favorite
                </div>
              )}
            </DropdownMenuItem>
          )}

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

          <DropdownMenuItem
            disabled={file.isTrash && !pathname?.includes("trash")}
            onClick={() => {
              if (file.isTrash && pathname?.includes("trash")) {
                handleRestoreFile(file._id);
              } else {
                setIsConfirmOpen(true);
              }
            }}
            className="flex gap-1 items-center cursor-pointer"
          >
            {file.isTrash && pathname?.includes("trash") && (
              <>
                <DropdownMenuSeparator />
                <div className="flex gap-1 text-green-600 items-center cursor-pointer">
                  <UndoIcon className="w-4 h-4" /> Restore
                </div>
              </>
            )}

            {pathname?.includes("favorites") && file.isTrash !== true ? (
              <>
                <DropdownMenuSeparator />
                <div className="flex gap-1 text-red-600 items-center cursor-pointer">
                  <TrashIcon className="w-4 h-4" /> Trash
                </div>
              </>
            ) : pathname?.includes("files") && file.isTrash !== true ? (
              <>
                <DropdownMenuSeparator />
                <div className="flex gap-1 text-red-600 items-center cursor-pointer">
                  <TrashIcon className="w-4 h-4" /> Trash
                </div>
              </>
            ) : (
              !pathname?.includes("trash") && (
                <>
                  <div className="flex gap-1 items-center text-gray-900 cursor-pointer">
                    <TrashIcon className="w-4 h-4" /> Trashed
                  </div>
                </>
              )
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setIsDeletePermenantly(true);
            }}
          >
            {file.isTrash && pathname?.includes("trash") && (
              <div className="flex gap-1 text-red-600 items-center cursor-pointer">
                <TrashIcon className="w-4 h-4" /> Delete Permenantly
              </div>
            )}
          </DropdownMenuItem>

          {/* </Protect> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default FileCardActions;
