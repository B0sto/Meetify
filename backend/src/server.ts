import express from 'express'
import { connectToDB } from './configs/db.js';
import cookieParser from 'cookie-parser';
import authRoute from './auth/auth.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
connectToDB();


app.use("/api/auth", authRoute)


export default app;