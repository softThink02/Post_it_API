"use strict";
// get all posts
// get a single post
// update a post
// delete a post
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class COMMENT_MANAGER {
    // create a comment
    createComment(commentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // make sure the postit exists
                const existingPostit = yield models_1.Postit.findOne({ _id: commentData.postId });
                if (!existingPostit) {
                    let error = new Error("Postit not found");
                    error.statusCode = 400;
                    throw error;
                }
                const newComment = new models_1.Comment(Object.assign({}, commentData));
                return yield newComment.save();
            }
            catch (err) {
                throw err;
            }
        });
    }
    // get all comments of a postit
    getComments(postitId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.Comment.find({ postId: postitId, deleted: false })
                    .populate({ path: "commentator", select: "username" })
                    .select("-deleted")
                    .lean()
                    .sort({ createdAt: -1 });
            }
            catch (err) {
                throw err;
            }
        });
    }
    // find one comment of a postit
    findComment(postitId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.Comment.findOne({ _id: commentId, postId: postitId, deleted: false })
                    .populate({ path: "commentator", select: "username" })
                    .select("-deleted")
                    .lean();
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Update a comment of a postit
    updateComment(userId, postitId, commentId, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let comment = yield models_1.Comment.findOne({ postId: postitId, _id: commentId, commentator: userId });
                // check if the current user is the owner of this comment
                if (!comment) {
                    let error = new Error("This comment doesn't belong to you");
                    error.statusCode = 400;
                    throw error;
                }
                if (comment.deleted) {
                    let error = new Error("Comment not found");
                    error.statusCode = 400;
                    throw error;
                }
                return yield models_1.Comment.findOneAndUpdate({ _id: commentId }, newData, { new: true });
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Method for deleting a postit's comment
    deleteComment(userId, postitId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Apply soft delete on this comment
                const comment = yield models_1.Comment.findOne({ commentator: userId, _id: commentId, postId: postitId });
                // check if the current user is the owner of the comment
                if (!comment) {
                    let error = new Error("This comment doesn't belong to you");
                    error.statusCode = 400;
                    throw error;
                }
                // check if this comment has been deleted previously
                if (comment.deleted) {
                    let error = new Error("Comment not found");
                    error.statusCode = 400;
                    throw error;
                }
                return yield comment.updateOne({ deleted: true }, { new: true });
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = new COMMENT_MANAGER();
