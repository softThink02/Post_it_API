import { body, check } from "express-validator"


export const CreateCommentValidator = [
    body("text", "Provide a text")
        .not()
        .isEmpty(),
]

export const UpdateCommentValidator = [
    body("text", "Provide a text")
        .not()
        .isEmpty(),
]