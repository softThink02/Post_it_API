import { body, check } from "express-validator"

import { User } from "../../models";

export const UpdateUserValidator = [
    body("username", "Please provide a Username")
        .not()
        .isEmpty()
        .custom(async (value: string, { req }) => {
            const existingUser = await User.findOne({ username: value });
            if (existingUser) {
                throw new Error("Username taken, choose another.");
            }
            return true
        }),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be upto eight characters"),
    // body("profilePicture")
    //     .not()
    //     .isEmpty()
    //     .withMessage("Please provide a profile picture")
]