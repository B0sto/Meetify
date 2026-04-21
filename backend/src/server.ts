import express, { type Request, type Response } from 'express'
import dotenv from 'dotenv';
import { connectToDB } from './configs/db.js';

const app = express();
dotenv.config();
connectToDB();


app.get("/", (req: Request, res: Response) => {
    res.send("Server is running fine")
})

export default app;