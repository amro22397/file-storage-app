import { File } from "@/models/files";
import mongoose from "mongoose";
import { SearchParams } from "../dashboard/files/page";


//   const files = await File.find({});
//   const jFiles = JSON.parse(JSON.stringify(files));


  export default async function getFiles(params: SearchParams, email: string | null | undefined) {

    try {
    mongoose.connect(process.env.MONGO_URL as string);

    const { searchTerm } = params;

    console.log(searchTerm);
    

    let searchString = searchTerm; 

    if (!searchTerm) {
        searchString = "";
    }

    let query: any = {};

    const files = await File.find({
        isTrash: false,
        title: { $regex: searchString, $options: "i"},
        emailRef: { $in: email },
    }).sort({ createdAt: -1 });

    const jfiles = JSON.parse(JSON.stringify(files));

    return jfiles;

    } catch (error) {
        console.log(error);
    }
  }