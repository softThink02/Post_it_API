import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Response } from "express";
import { ICustomRequest } from "../interfaces/request.interface";
import { IErrorObj } from "../interfaces/error.interface";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const isAuthenticated = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.json({ message: "No token provided", success: false });
    }

    const decoded: any = await jwt.verify(token, JWT_SECRET!)
    if (!decoded) {
      let error: IErrorObj = new Error("Invalid token, login again...");
      error.statusCode = 401;
      throw error;
    }
    req.userId = decoded.userId
    req.userRole = decoded.role
    next()
  } catch (err) {
    next(err);
  }
};

export default isAuthenticated;