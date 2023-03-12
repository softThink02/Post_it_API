import mongoose, { model, Schema } from "mongoose";
import { SCHEMAS } from "../utilities/constants";

const postSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: SCHEMAS.USER_SCHEMA, required: true },
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
    mentions: [{ type: Schema.Types.ObjectId, ref: SCHEMAS.USER_SCHEMA }]

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

postSchema.virtual("comments", {
    ref: SCHEMAS.COMMENT_SCHEMA,
    localField: "_id",
    foreignField: "postId",
    options: {sort: {createdAt: -1}}
})

export default model(SCHEMAS.POST_SCHEMA, postSchema)