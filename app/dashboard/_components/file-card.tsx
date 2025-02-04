'use client'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { formatRelative } from "date-fns";
  
  // import { Doc } from "../../../../convex/_generated/dataModel";
  import { FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react";
  import { ReactNode } from "react";
  // import { useQuery } from "convex/react";
  // import { api } from "../../../../convex/_generated/api";
  import Image from "next/image";
  import ReactPlayer from 'react-player';
  // import { FileCardActions } from "./file-actions";


  import React from 'react'
import FileCardActions from "./file-actions";
  
  const FileCard = ({
    file,
    fetchFiles,
    fetchTrash,
    fetchFav
  }: {
    file: any
    fetchFiles?: () => void
    fetchTrash?: () => void
    fetchFav?: () => void
    // { isFavorited: boolean; url: string | null }
  }) => {

    const typeIcons = {
        image: <ImageIcon />,
        pdf: <FileTextIcon />,
        csv: <GanttChartIcon />,
      } as any;
      
    return (
        <Card className="">
        <CardHeader className="relative">
          <CardTitle className="flex flex-col gap-2 text-base font-normal">
            <span className="text-lg font-semibold tracking-wide">{file.title}</span>
            {true && (
              <span className="text-md h-7 overflow-hidden overflow-ellipsis">{file.name}</span>
            )}
          </CardTitle>
          <div className="absolute top-2 right-2">
            <FileCardActions isFavorited={file.isFavorited} file={file}
            fetchFiles={fetchFiles} fetchTrash={fetchTrash} fetchFav={fetchFav} />
          </div>
        </CardHeader>
        <CardContent className="h-[200px] w-full flex justify-center items-center">
          {file.type.includes("image") && file.file ? (
            <Image alt={file.name} width="250" height="100" src={file.file}
            className="object-fill h-[175px] max-w-full" />
          ) : file.type.includes("audio") || file.type.includes("video")  ? (
            <div className="w-full h-full">
              <ReactPlayer url={file.file}
              width="100%"
              height="100%"
              controls />
            </div>
          )
           : (
            <FileTextIcon size={64} />
          )}
        </CardContent>
        <CardFooter className="flex justify-between my-1">
          <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
            {/* <Avatar className="w-6 h-6">
              <AvatarImage src= />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {"" /* userProfile?.name */}
          </div>
          <div className="text-xs text-gray-700">
            Uploaded on {formatRelative(new Date(file.createdAt), new Date())}
          </div>
        </CardFooter>
      </Card>
    )
  }
  
  export default FileCard
  