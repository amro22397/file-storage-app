import mongoose from "mongoose";
import { SearchParams } from "../dashboard/files/page";
import { File } from "@/models/files";


export default async function getFavFiles(params: SearchParams) {

    try {
        mongoose.connect(process.env.MONGO_URL as string);

    const { searchTerm } = params;

    let searchString = searchTerm;

    if (!searchTerm) {
        searchString = "";
    }

    const favFiles = await File.find({
        isFavorite: true,
        title: { $regex: searchString, $options: "i" },
    })
    .sort({ createdAt: -1 });

    const jfavFiles = JSON.parse(JSON.stringify(favFiles));

    return jfavFiles;

    } catch (error) {
        console.log(error);
    }
}