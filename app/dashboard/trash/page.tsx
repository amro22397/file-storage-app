import getTrashFiles from "@/app/actions/getTrashFiles";
import { FileBrowser } from "../_components/file-browser";
import { SearchParams } from "../files/page";
import { getSession } from "@/actions/getUser";

export default async function FavoritesPage({ searchParams }: { searchParams: SearchParams}) {

  const session = await getSession();
    const trashFiles = await getTrashFiles(searchParams, session?.user?.email) || [];

      

    console.log(trashFiles);
  return (
    <div>
      <FileBrowser title="Trash" files={trashFiles} email={session?.user?.email} deletedOnly />
    </div>
  );
}