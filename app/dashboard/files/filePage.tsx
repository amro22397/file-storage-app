'use client'

import mongoose from "mongoose";
import { FileBrowser } from "../_components/file-browser";
// import { File } from "@/models/files";
import getFiles from "@/app/actions/getFiles";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

const FilePage = ({ email, searchTerm }: {
    email: string | null | undefined 
    searchTerm?: string | undefined;
}) => {

    // const { data: session, status } = useSession({
    //     required: true,
    //   });
    //   console.log(session)

      const [files, setFiles] = useState([]);

      if (searchTerm === undefined) {
        searchTerm = "";
      }

      const fetchFiles = async () => {
        const res = await axios.get(`/api/files?searchTerm=${searchTerm}&email=${email}`);
  
        console.log(res.data);
        setFiles(res.data.data);
      }
  
      useEffect(() => {
        fetchFiles();
      }, [searchTerm, email]);

      console.log(email)

  return (
    <div>
      <FileBrowser title="Your Files" files={files} email={email}
      fetchFiles={fetchFiles} />
    </div>
  )
}

export default FilePage
