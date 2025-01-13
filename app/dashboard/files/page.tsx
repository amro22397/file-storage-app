import mongoose from "mongoose";
import { FileBrowser } from "../_components/file-browser";
import { File } from "@/models/files";
import getFiles from "@/app/actions/getFiles";

export interface SearchParams {
  searchTerm?: string | undefined;
}


export default async function FilesPage({ searchParams }: { searchParams: SearchParams }) {

  console.log( searchParams );

  const files = await getFiles(searchParams) || []

  console.log(files);

  return (
    <div>
      <FileBrowser title="Your Files" files={files} />
    </div>
  );
}