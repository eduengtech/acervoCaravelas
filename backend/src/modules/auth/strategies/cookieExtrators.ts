import { Request } from "express";

export const cookieExtrator = (req:Request): string | null => {
    if (req && req.cookies) return req.cookies['accessToken'] || null;

    return null;
};