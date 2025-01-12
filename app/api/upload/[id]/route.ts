import { File } from "@/models/files";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";


export async function DELETE(req: Request, { params }: { params: { id: string }}) {

    mongoose.connect(process.env.MONGO_URL as string);

    console.log(params.id);

    const file = await File.findByIdAndDelete(params.id);

    revalidatePath("/dashboard/files")

    return Response.json(file)

}