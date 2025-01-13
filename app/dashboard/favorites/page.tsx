import getFavFiles from "@/app/actions/getFavFiles";
// import { useQuery } from "convex/react";
// import { api } from "../../../../convex/_generated/api";

import { FileBrowser } from "../_components/file-browser";

export interface SearchParams {
    searchTerm?: string | undefined;
  }

export default async function FavoritesPage({ searchParams }: { searchParams: SearchParams }) {

    const favFiles = await getFavFiles(searchParams) || []

    console.log(favFiles);

  return (
    <div>
      <FileBrowser title="Favorites" files={favFiles} favoritesOnly />
    </div>
  );
} 