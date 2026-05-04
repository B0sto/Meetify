import jwt from 'jsonwebtoken'

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;


export const generateAccessToken = (userId: string) => {
    if (!userId) throw new Error("Invalid User id");
    if (!ACCESS_SECRET) throw new Error("Invalid access token");
    return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "30m" });
}


export const generateRefreshToken = (userId: string) => {
    if (!userId) throw new Error("Invalid User id");
    if (!REFRESH_SECRET) throw new Error("Invalid refresh token");
    return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: "7d" });
}