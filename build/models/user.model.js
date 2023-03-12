"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utilities/constants");
const userSchema = new mongoose_1.Schema({
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
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
userSchema.virtual("posts", {
    ref: constants_1.SCHEMAS.POST_SCHEMA,
    localField: "_id",
    foreignField: "creator"
});
exports.default = (0, mongoose_1.model)(constants_1.SCHEMAS.USER_SCHEMA, userSchema);
