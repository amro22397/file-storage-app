import { File } from "@/models/files";
import mongoose from "mongoose";


export async function PUT(req: Request, { params }: { params: { id: string }}) {
    mongoose.connect(process.env.MONGO_URL as string);

    const file = await File.updateOne({ _id: params.id }, { $set: { isTrash: false }})

    return Response.json({
        success: true,
        message: "File restored successfully"
    })
}