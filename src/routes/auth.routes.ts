import express, { Request, Response } from "express";
import bcrypt from "bcrypt"
import { body } from "express-validator"

import { User } from "../models"
import { SignupValidator, LoginValidator } from "../utilities/validatorHandles/auth";
import AuthContoller from "../controllers/authentication";

const authRouter = express.Router()

// const signupValidator = new AuthValidators("signup")

authRouter
    .post("/signup", SignupValidator, AuthContoller.signup)
    .post("/login", LoginValidator, AuthContoller.login)

export default authRouter;