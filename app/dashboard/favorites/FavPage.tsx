'use client'

import React, { useEffect, useState } from 'react'
import { FileBrowser } from '../_components/file-browser';
import axios from 'axios';

const FavPage = ({ email, searchTerm }: {
    email: string | null | undefined 
    searchTerm?: string | undefined;
}) => {

    const [favFiles, setFavFiles] = useState([]);

      if (searchTerm === undefined) {
        searchTerm = "";
      }

      const fetchFiles = async () => {
        const res = await axios.get(`/api/fav-files?searchTerm=${searchTerm}&email=${email}`);
  
        console.log(res.data);
        setFavFiles(res.data.data);
      }
  
      useEffect(() => {
        fetchFiles();
      }, [searchTerm, email]);

      console.log(email)


  return (
    <div>
        <FileBrowser title="Favorites" files={favFiles} email={email} 
        fetchFav={fetchFiles} favoritesOnly />
    </div>
  )
}

export default FavPage
