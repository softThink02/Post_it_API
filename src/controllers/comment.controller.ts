import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import CommentServices from "../services/comment.services";
import { Comment } from "../models";
import { IErrorObj } from "../interfaces/error.interface";
import { ICustomRequest } from "../interfaces/request.interface";

class COMMENT_CONTROLLER {

    // create new comment for a postit
    async createComment(req: ICustomRequest, res: Response, next: NextFunction) {
        const postId = req.params.postitId;
        const commentator = req.userId!
        const text = req.body.text

        try {
            // check for errors thrown from validators
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let error: IErrorObj = new Error(errors.array()[0].msg);
                error.statusCode = 400;
                throw error;
            }

            // create a new comment...
            const newComment = await CommentServices
                .createComment({ text, commentator, postId })

            newComment ?
                res
                    .status(200)
                    .json({ message: "Comment sent", data: newComment, success: true })
                : res
                    .status(400)
                    .json({ message: "An error occured", success: false });
        } catch (err) {
            next(err);
        }
    }

    // get all comments of a postit
    async getAllComments(req: ICustomRequest, res: Response, next: NextFunction) {
        const postitId = req.params.postitId;

        try {
            const comments = await CommentServices.getComments(postitId)
            comments ?
                res
                    .status(200)
                    .json({ data: comments, success: true })
                : res
                    .status(400)
                    .json({ message: "No comments found", success: false });
        } catch (err) {
            next(err)
        }
    };

    // get one comment of a postit
    async findOneComment(req: Request, res: Response, next: NextFunction) {
        const postitId = req.params.postitId
        const commentId = req.params.commentId

        try {
            const comment = await CommentServices.findComment(postitId, commentId)
            comment ?
                res
                    .status(200)
                    .json({ data: comment, success: true })
                : res
                    .status(400)
                    .json({ message: "comment not found", success: false });
        } catch (err) {
            next(err)
        }
    };

    // update a comment of a postit
    async update_A_Comment(req: ICustomRequest, res: Response, next: NextFunction) {
        const postitId = req.params.postitId
        const commentId = req.params.commentId
        const postitBody = req.body;
        const userId = req.userId!

        try {
            // check for errors thrown from validators
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let error: IErrorObj = new Error(errors.array()[0].msg);
                error.statusCode = 400;
                throw error;
            }

            // update the comment here...
            const updatedComment = await CommentServices
                .updateComment(userId, postitId, commentId, postitBody)

            // send response after postit has been updated
            updatedComment &&
                res
                    .status(200)
                    .json({ message: "Comment updated", data: updatedComment, success: true })
        } catch (err) {
            next(err)
        }
    };

    // delete a postit's comment
    async delete_A_Comment(req: ICustomRequest, res: Response, next: NextFunction) {
        const postitId = req.params.postitId;
        const commentId = req.params.commentId;

        try {
            const deletedComment = await CommentServices
                .deleteComment(req.userId!, postitId, commentId);

            deletedComment &&
                res
                    .status(200)
                    .json({ message: "Comment deleted", success: true })
        } catch (err) {
            next(err)
        }
    };
}

export default new COMMENT_CONTROLLER();
