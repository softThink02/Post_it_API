"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const comment_services_1 = __importDefault(require("../services/comment.services"));
class COMMENT_CONTROLLER {
    // create new comment for a postit
    createComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.postitId;
            const commentator = req.userId;
            const text = req.body.text;
            try {
                // check for errors thrown from validators
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    let error = new Error(errors.array()[0].msg);
                    error.statusCode = 400;
                    throw error;
                }
                // create a new comment...
                const newComment = yield comment_services_1.default
                    .createComment({ text, commentator, postId });
                newComment ?
                    res
                        .status(200)
                        .json({ message: "Comment sent", data: newComment, success: true })
                    : res
                        .status(400)
                        .json({ message: "An error occured", success: false });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // get all comments of a postit
    getAllComments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const postitId = req.params.postitId;
            try {
                const comments = yield comment_services_1.default.getComments(postitId);
                comments ?
                    res
                        .status(200)
                        .json({ data: comments, success: true })
                    : res
                        .status(400)
                        .json({ message: "No comments found", success: false });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
    // get one comment of a postit
    findOneComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const postitId = req.params.postitId;
            const commentId = req.params.commentId;
            try {
                const comment = yield comment_services_1.default.findComment(postitId, commentId);
                comment ?
                    res
                        .status(200)
                        .json({ data: comment, success: true })
                    : res
                        .status(400)
                        .json({ message: "comment not found", success: false });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
    // update a comment of a postit
    update_A_Comment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const postitId = req.params.postitId;
            const commentId = req.params.commentId;
            const postitBody = req.body;
            const userId = req.userId;
            try {
                // check for errors thrown from validators
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    let error = new Error(errors.array()[0].msg);
                    error.statusCode = 400;
                    throw error;
                }
                // update the comment here...
                const updatedComment = yield comment_services_1.default
                    .updateComment(userId, postitId, commentId, postitBody);
                // send response after postit has been updated
                updatedComment &&
                    res
                        .status(200)
                        .json({ message: "Comment updated", data: updatedComment, success: true });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
    // delete a postit's comment
    delete_A_Comment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const postitId = req.params.postitId;
            const commentId = req.params.commentId;
            try {
                const deletedComment = yield comment_services_1.default
                    .deleteComment(req.userId, postitId, commentId);
                deletedComment &&
                    res
                        .status(200)
                        .json({ message: "Comment deleted", success: true });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
}
exports.default = new COMMENT_CONTROLLER();
