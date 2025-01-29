import getTrashFiles from "@/app/actions/getTrashFiles";
import { FileBrowser } from "../_components/file-browser";
import { SearchParams } from "../files/page";
import { getSession } from "@/actions/getUser";
import TrashPage from "./TrashPage";

export default async function FavoritesPage({ searchParams }: { searchParams: SearchParams}) {

  const session = await getSession();
  console.log(session?.user?.email)

  const { searchTerm } = await searchParams;
  console.log(searchTerm)

    // const trashFiles = await getTrashFiles(searchParams, session?.user?.email) || [];

      

    // console.log(trashFiles);
  return (
    <div>
      {/* <FileBrowser title="Trash" files={trashFiles} email={session?.user?.email} deletedOnly /> */}
      <TrashPage email={session?.user?.email} searchTerm={searchTerm} />
    </div>
  );
}