'use client'

import mongoose from "mongoose";
import { FileBrowser } from "../_components/file-browser";
// import { File } from "@/models/files";
import getFiles from "@/app/actions/getFiles";
import { getSession } from "@/actions/getUser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export interface SearchParams {
  searchTerm?: string | undefined;
}


export default function FilesPage({ searchParams }: { searchParams: SearchParams }) {

  console.log( searchParams );

  const { data: session, status } = useSession();
  console.log(session)

  // const session = await getSession();
  // console.log(session?.user?.email)

  // const files = await getFiles(searchParams, session?.user?.email) || []

      const [files, setFiles] = useState([]);

      const fetchFiles = async () => {
        const res = await axios.get("/api/files");
  
        console.log(res.data);
        setFiles(res.data.data);
      }
  
      useEffect(() => {
        fetchFiles();
      }, []);
  

  


  return (
    <div>
      <FileBrowser title="Your Files" files={files} email={session} />
    </div>
  );
}