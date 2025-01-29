import mongoose from 'mongoose';


const FileSchema = new mongoose.Schema({
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


export default mongoose.models?.File || mongoose.model("File", FileSchema);