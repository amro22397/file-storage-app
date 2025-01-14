import mongoose from "mongoose";
import { FileBrowser } from "../_components/file-browser";
import { File } from "@/models/files";
import getFiles from "@/app/actions/getFiles";
import { getSession } from "@/actions/getUser";

export interface SearchParams {
  searchTerm?: string | undefined;
}


export default async function FilesPage({ searchParams }: { searchParams: SearchParams }) {

  console.log( searchParams );

  const session = await getSession();
  console.log(session?.user?.email)

  const files = await getFiles(searchParams, session?.user?.email) || []

  


  return (
    <div>
      <FileBrowser title="Your Files" files={files} email={session?.user?.email} />
    </div>
  );
}