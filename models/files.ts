import { model, models, Schema } from "mongoose";


const FileSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    file: {
        type: String,
        required: true,
    },

}, {timestamps: true})


export const File = models?.File || model("File", FileSchema);