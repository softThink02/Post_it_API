import mongoose, { model, Schema } from "mongoose";
import { SCHEMAS } from "../utilities/constants";

const commentSchema = new Schema(
    {
        text: {
            type: String,
            minlength: [3, 'Must be three characters long'],
            required: [true, 'Text is required']
        },
        commentator: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: SCHEMAS.USER_SCHEMA
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: SCHEMAS.POST_SCHEMA,
            required: true
        },
        deleted: {
            type: Boolean,
            default: false,
        }

    },
    {
        timestamps: true
    }
);

export default model(SCHEMAS.COMMENT_SCHEMA, commentSchema)
