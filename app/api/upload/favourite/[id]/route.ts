import { File } from "@/models/files";
import mongoose from "mongoose";


export async function PUT(req: Request, { params }: { params: { id: string }}) {
    mongoose.connect(process.env.MONGO_URL as string);

    const file = await File.findOne({ _id: params.id });

    if (file.isFavorite) {
        await File.updateOne({ _id: params.id }, { $set: { isFavorite: false }})

        return Response.json({
            success: true,
            message: "File is removed from favorites successfully",
        })
    } else {
        await File.updateOne({ _id: params.id }, { $set: { isFavorite: true }})

        return Response.json({
            success: true,
            message: "File is added to favorites successfully",
        })
    }

    return Response.json(true);
}