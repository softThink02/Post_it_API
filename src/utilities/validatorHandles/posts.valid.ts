import { body, check } from "express-validator"

export const CreatePostValidator = [
    body("title")
        .custom(async (value) => {
            if (value.toString().trim() === "") {
                throw new Error("Title must not be empty")
            }
            return true;
        }),
    body("description")
        .custom(async (value) => {
            if (value.toString().trim() === "") {
                throw new Error("Description must not be empty")
            }
            return true;
        }),
]

export const UpdatePostValidator = [
    body("title")
        .custom(async (value) => {
            if (value.toString().trim() === "") {
                throw new Error("Title must not be empty")
            }
            return true;
        }),
    body("description")
        .custom(async (value) => {
            if (value.toString().trim() === "") {
                throw new Error("Description must not be empty")
            }
            return true;
        }),
]