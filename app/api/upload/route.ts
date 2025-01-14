import { File } from "@/models/files";
import mongoose from "mongoose";


export async function POST(req: Request) {
    mongoose.connect(process.env.MONGO_URL as string);
    const { title, name, file, type, emailRef } = await req.json();
    
    /* const fileType = file.type;
    console.log(fileType);
    
    const fileName = file.name;
    console.log(fileName); */

    if (!title) {
        return Response.json({
            success: false,
            message: "You need to provide a title"
        })
    }

    if (file.trim() === "") {
        return Response.json({
            success: false,
            message: "You need to upload a file"
        })
    }

    if (!emailRef) {
        return Response.json({
            success: false,
            message: "You need to sign in to upload a file"
        })
    }

    const fileObj = await File.create({
        title,
        name,
        file,
        type,
        emailRef
    })

    return Response.json({
        success: true,
        message: "File uploaded successfully"
    })


}