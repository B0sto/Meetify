import mongoose from 'mongoose';

interface IUser {
    username: string;
    email: string;
    password: string;
    profilePic: string;
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const User = mongoose.model<IUser>("user", userSchema);

export default User;