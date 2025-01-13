import getTrashFiles from "@/app/actions/getTrashFiles";
import { FileBrowser } from "../_components/file-browser";
import { SearchParams } from "../files/page";

export default async function FavoritesPage({ searchParams }: { searchParams: SearchParams}) {

    const trashFiles = await getTrashFiles(searchParams) || [];

    console.log(trashFiles);
  return (
    <div>
      <FileBrowser title="Trash" files={trashFiles} deletedOnly />
    </div>
  );
}