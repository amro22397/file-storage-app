import mongoose from "mongoose";
import { FileBrowser } from "../_components/file-browser";
import { File } from "@/models/files";

export default async function FilesPage() {

  mongoose.connect(process.env.MONGO_URL as string);
  const files = await File.find({});
  const jFiles = JSON.parse(JSON.stringify(files));

  console.log(files);

  return (
    <div>
      <FileBrowser title="Your Files" files={jFiles} />
    </div>
  );
}