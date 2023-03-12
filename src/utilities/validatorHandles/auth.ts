import express, { Request, Response } from "express"
import bcrypt from "bcrypt"
import { body } from "express-validator"

import { User } from "../../models"

const LoginValidatorHandler = () => {
    let user: any;
    return [
        body("email", "Invalid email provided")
            .isEmail()
            .custom(async (value) => {
                const existingEmail = await User.findOne({ email: value });
                user = existingEmail;
                if (!existingEmail) {
                    throw new Error("Email address not found");
                }
                return true;
            }),
        body("password").custom(async (value, { req }) => {
            const passwordMatch = await bcrypt.compare(value, user.password);
            if (!passwordMatch) {
                throw Error("Incorrect Passoword");
            }
            return true;
        })
    ]
}

export const SignupValidator = [
    body("email", "Invalid email address")
        .isEmail()
        .custom(async (value: string, { req }) => {
            const existingEmail = await User.findOne({ email: value });
            if (existingEmail) {
                throw new Error("This email already exists, use another one.");
            }
            return true
        }),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be upto eight characters"),
    body("role")
        .not()
        .isEmpty()
        .withMessage("User role must be specified to be either user or admin")
]

export const LoginValidator = LoginValidatorHandler()