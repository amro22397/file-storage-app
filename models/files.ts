import { model, models, Schema } from "mongoose";


const FileSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    file: {
        type: String,
        required: true,
    },

    emailRef: {
        ref: "User",
        type: String,
        required: true,
    },

    type: {
        type: String,
    },

    isFavorite: {
        type: Boolean,
        default: false,
    },
    isTrash : {
        type: Boolean,
        default: false, 
    }

}, {timestamps: true})


export const File = models?.File || model("File", FileSchema);