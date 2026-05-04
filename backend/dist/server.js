import express, {} from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './configs/db.js';
import cookieParser from 'cookie-parser';
import authRoute from './auth/auth.route.js';
const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
connectToDB();
app.use("/api/auth", authRoute);
export default app;
//# sourceMappingURL=server.js.map