import mongoose, { model, Schema } from "mongoose";
import { SCHEMAS } from "../utilities/constants";

const userSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "",
        required: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    deleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

userSchema.virtual("posts", {
    ref: SCHEMAS.POST_SCHEMA,
    localField: "_id",
    foreignField: "creator"
})

export default model(SCHEMAS.USER_SCHEMA, userSchema)