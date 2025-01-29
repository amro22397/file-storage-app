import mongoose from "mongoose";
import FilePage from "./filePage";
import { getSession } from "@/actions/getUser";

export interface SearchParams {
  searchTerm?: string | undefined;
}


export default async function FilesPage({ searchParams }: { searchParams: {
  searchTerm?: string | undefined;
}}) {

  
  const session = await getSession();
  console.log(session?.user?.email)


  const { searchTerm } = await searchParams;
  console.log(searchTerm)

  // const files = await getFiles(searchParams, session?.user?.email) || []

      
  

  


  return (
    <div>
      <FilePage email={session?.user?.email} searchTerm={searchTerm} />
    </div>
  );
}