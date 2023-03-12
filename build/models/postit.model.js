"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utilities/constants");
const postSchema = new mongoose_1.Schema({
    creator: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.SCHEMAS.USER_SCHEMA, required: true },
    draft: { type: Boolean, default: false },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: { type: String, required: true },
    hashtags: [{ type: String }],
    thumbnail: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    // mentions specifies the list of users that can reply to this postit
    mentions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.SCHEMAS.USER_SCHEMA }]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
postSchema.virtual("comments", {
    ref: constants_1.SCHEMAS.COMMENT_SCHEMA,
    localField: "_id",
    foreignField: "postId",
    options: { sort: { createdAt: -1 } }
});
exports.default = (0, mongoose_1.model)(constants_1.SCHEMAS.POST_SCHEMA, postSchema);
