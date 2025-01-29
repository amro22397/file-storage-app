import getFavFiles from "@/app/actions/getFavFiles";
// import { useQuery } from "convex/react";
// import { api } from "../../../../convex/_generated/api";

import { FileBrowser } from "../_components/file-browser";
import { getSession } from "@/actions/getUser";
import FavPage from "./FavPage";

export interface SearchParams {
    searchTerm?: string | undefined;
  }

export default async function FavoritesPage({ searchParams }: { searchParams: SearchParams }) {

  const session = await getSession();
  console.log(session?.user?.email)


  const { searchTerm } = await searchParams;
  console.log(searchTerm)

    // const favFiles = await getFavFiles(searchParams, session?.user?.email) || []

      

    // console.log(favFiles);

  return (
    <div>
      {/* <FileBrowser title="Favorites" files={favFiles} email={session?.user?.email} favoritesOnly /> */}
      <FavPage email={session?.user?.email} searchTerm={searchTerm} />
    </div>
  );
} 