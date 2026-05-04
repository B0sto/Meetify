import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/express.js";
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET!) as any;

        req.user = { userId: decoded.userId };

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}