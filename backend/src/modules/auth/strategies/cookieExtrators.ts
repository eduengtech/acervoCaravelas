import { Request } from "express";

export const cookieExtrator = (req: Request): string | null => {
  let token: string | null = null;

  if (req && req.cookies) {
    token = req.cookies["token"] as string;
  }

  return token;
};
