import express, { NextFunction, Response } from "express";
import { ICustomRequest } from "../interfaces/request.interface";

const Authorizer = (req: ICustomRequest, res: Response, next: NextFunction) => {
  if (req.userRole !== "admin") {
    return res
      .status(401)
      .json({ message: "Not authorized to access resource", success: false });
  }
  next();
};

export default Authorizer;
