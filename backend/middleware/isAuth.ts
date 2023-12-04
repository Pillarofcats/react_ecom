import jwt from "jsonwebtoken";
import { tUserId } from "../types/types.js";
import { Request, Response, NextFunction } from "express";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.signedCookies["3b_uid"]) return res.status(401).end();

  const token = req.signedCookies["3b_uid"];
  let userId;

  try {
    userId = jwt.verify(token, process.env.JWT_SECRET) as tUserId;

    if (userId.u_id) next();
  } catch (error) {
    console.log(error);
    return res.status(401).end();
  }
}
