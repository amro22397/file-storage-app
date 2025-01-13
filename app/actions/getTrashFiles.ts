import mongoose from "mongoose";
import { SearchParams } from "../dashboard/files/page";
import { File } from "@/models/files";

 

 export default async function getTrashFiles(params: SearchParams) {

    try {
        mongoose.connect(process.env.MONGO_URL as string);

        const { searchTerm } = params;

        let searchString = searchTerm;

        if (!searchTerm) {
            searchString = "";
        }

        const files = await File.find({
            isTrash: true,
            title: { $regex: searchString, $options: "i" },
        })
        .sort({ createdAt: -1 });

        const jFiles = JSON.parse(JSON.stringify(files));

        return jFiles;

    } catch (error) {
        console.log(error);
    }
 }