import mongoose from "mongoose";

interface IMessage {
    senderId: mongoose.Schema.Types.ObjectId;
    receiverId: mongoose.Schema.Types.ObjectId;
    message: string;
    image: string;
}


const messageSchema = new mongoose.Schema<IMessage>({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    message: {
        type: String,
        maxLength: 2000,
        trim: true,
    },
    image: {
        type: String,
    }
}, { timestamps: true })


const Message = mongoose.model<IMessage>("message", messageSchema);

export default Message;