"use client"

/* import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api"; */
// import { FileCard } from "./file-card";
import Image from "next/image";
import { FileIcon, GridIcon, Loader2, RowsIcon, StarIcon, TrashIcon } from "lucide-react";
// import { SearchBar } from "./search-bar";
import { useEffect, useState } from "react";
import DataTable from "./file-table";
// import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Doc } from "../../../../convex/_generated/dataModel";
import { Label } from "@/components/ui/label";
import UploadButton from "./UploadButton";
import FileCard from "./file-card";
import SearchBar from "./search-bar";
import { Url } from "next/dist/shared/lib/router/router";
import { columns } from "./columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import SideMobileNav from "./SideMobileNav";
import axios from "axios";

export type UploadedFile = {
  _id: string,
  title: string,
  file?: File | Url | any,
  isFavorite?: boolean,
  isTrash?: boolean,
}


function Placeholder({ email, fetchFiles }: { 
  email: string,
  fetchFiles?: () => void
 }) {
    return (
      <div className="flex flex-col gap-8 w-full items-center mt-24">
        <Image
          alt="an image of a picture and directory icon"
          width="300"
          height="300"
          src="/empty.svg"
        />
        <div className="text-2xl">You have no files, upload one now</div>
        <UploadButton email={email} fetchFiles={fetchFiles} />
      </div>
    );
  }


  export function FileBrowser({
    title,
    favoritesOnly,
    deletedOnly,
    files,
    email,
    fetchFiles,
    fetchTrash,
    fetchFav
  }: {
    title: string;
    favoritesOnly?: boolean;
    deletedOnly?: boolean;
    files?: UploadedFile[];
    email?: string | any;
    fetchFiles?: () => void
    fetchTrash?: () => void;
    fetchFav?: () => void;
  }) {

    const [query, setQuery] = useState("");
    const [type, setType] = useState<File | "all" | any>("all");
    const [gridOrTable, setGridOrTable] = useState(localStorage.getItem("gridOrTable") || "grid");

    // const [newfiles, setNewfiles] = useState([]);

    const pathname = usePathname();
    console.log(pathname);

    // const fetchFiles = async () => {
    //   const res = await axios.get("/api/files");

    //   console.log(res.data);

    // }

    // useEffect(() => {
    //   fetchFiles();
    // }, []);




    return (

        <div className="px-4 xl:px-0">

          <SideMobileNav />

      <div className="flex flex-row justify-between items-center mb-8
      px-2 xl:px-0">
        <h1 className="text-4xl font-bold">{title}</h1>

        <SearchBar query={query} setQuery={setQuery} />

        <UploadButton email={email} fetchFiles={fetchFiles} />
      </div>

      <div className="text-center text-md text-gray-600
      max-xl:my-3">
        You can upload any file you want (Audio, Video, Image, PDF, Word)
      </div>

      <Tabs defaultValue={gridOrTable} className="">
        <div className="flex justify-between items-center">
          <TabsList className="mb-2">
            <TabsTrigger value="grid" className="flex gap-2 items-center"
            onClick={() => {
              localStorage.setItem("gridOrTable", "grid");
            }}
            >
              <GridIcon />
              Grid
            </TabsTrigger>
            <TabsTrigger value="table" className="flex gap-2 items-center"
            onClick={() => {
              localStorage.setItem("gridOrTable", "table");
            }}
            >
              <RowsIcon /> Table
            </TabsTrigger>
          </TabsList>

          <div className="hidden gap-2 items-center">
            <Label htmlFor="type-select">Type Filter</Label>
            <Select
              value={type}
              onValueChange={(newType) => {
                setType(newType as any);
              }}
            >
              <SelectTrigger id="type-select" className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent> 
            </Select>
          </div>
        </div>

        {/* isLoading */ false && (
          <div className="flex flex-col gap-8 w-full items-center mt-24">
            <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
            <div className="text-2xl">Loading your files...</div>
          </div>
        )}

        <TabsContent value="grid" className="">
          <div className="grid xl:grid-cols-3 gap-4
          sm:grid-cols-2">
            {files?.map((file) => {
              return (
                <FileCard key={file._id} file={file}
                fetchFiles={fetchFiles} fetchTrash={fetchTrash} fetchFav={fetchFav} />
              ) ;
            })}
          </div>
        </TabsContent>

        {files?.length !== 0 && (
          <TabsContent value="table">
          <DataTable columns={columns} data={files} />
        </TabsContent>
        )}

      </Tabs>

      {files?.length === 0 && <Placeholder email={email} fetchFiles={fetchFiles} />}
    </div>


    )
  }