"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utilities/constants");
const commentSchema = new mongoose_1.Schema({
    text: {
        type: String,
        minlength: [3, 'Must be three characters long'],
        required: [true, 'Text is required']
    },
    commentator: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: constants_1.SCHEMAS.USER_SCHEMA
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: constants_1.SCHEMAS.POST_SCHEMA,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)(constants_1.SCHEMAS.COMMENT_SCHEMA, commentSchema);
