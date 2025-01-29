'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FileBrowser } from '../_components/file-browser';

const TrashPage = ({ email, searchTerm }: {
    email: string | null | undefined 
    searchTerm?: string | undefined;
}) => {

    const [trashFiles, setTrashFiles] = useState([]);
      if (searchTerm === undefined) {
        searchTerm = "";
      }

      const fetchFiles = async () => {
        const res = await axios.get(`/api/trash-files?searchTerm=${searchTerm}&email=${email}`);
  
        console.log(res.data);
        setTrashFiles(res.data.data);
      }
  
      useEffect(() => {
        fetchFiles();
      }, [searchTerm, email]);

      console.log(email)

      
  return (
    <div>
      <FileBrowser title="Trash" files={trashFiles} email={email} deletedOnly />
    </div>
  )
}

export default TrashPage
