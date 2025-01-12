import { File } from "@/models/files";
import mongoose from "mongoose";


export async function POST(req: Request) {
    mongoose.connect(process.env.MONGO_URL as string);
    const { title, file } = await req.json();
    
    /* const fileType = file.type;
    console.log(fileType);
    
    const fileName = file.name;
    console.log(fileName); */

    const fileObj = await File.create({
        title,
        file
    })

    return Response.json({
        success: true,
        message: "File uploaded successfully"
    })


}