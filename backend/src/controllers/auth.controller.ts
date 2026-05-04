import type { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";


export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
        return res.status(400).json({ message: "User exists" });
    }

    const hashedPassword = await hashPassword(password);


    await User.create({
        username,
        email,
        password: hashedPassword
    })

    res.status(201).json({ message: "Registered" });
}


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
    }

    
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
    }

    const userId = user._id.toString();

    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    })

    res.json({ accessToken });
}


export const refresh = (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ message: "No refresh token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET!) as any;

        const newAccess = generateAccessToken(decoded.userId);

        res.json({ accessToken: newAccess });
    } catch (error) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
}


export const logout = (req: Request, res: Response) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict"
    });
    res.json({ message: "Logged out" });
}