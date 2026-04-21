import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in env variables")
        }
        await mongoose.connect(mongoURI);

        console.log("Successfully connected to MongoDB");

    } catch (err) {
        if (err instanceof mongoose.Error) {
            console.log("Database Connection Error", err);
        }
        else {
            console.log("Something went wrong")
        }
        process.exit(1)

    }
}