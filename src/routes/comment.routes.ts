import express from "express";
import commentController from "../controllers/comment.controller";
import {
  CreateCommentValidator,
  UpdateCommentValidator
} from "../utilities/validatorHandles/comment.valid";
import isAuthenticated from "../middleware/authenticator";

const commentRouter = express.Router();

commentRouter
  // add comment to a postit
  .post(
    "/:postitId/comments",
    isAuthenticated,
    CreateCommentValidator,
    commentController.createComment
  )

  // get all comments of a particular postit
  .get("/:postitId/comments", commentController.getAllComments)

  // get a single comment of a particular postit
  .get("/:postitId/comments/:commentId", commentController.findOneComment)

  // update a comment of a particular postit
  .put(
    "/:postitId/comments/:commentId",
    isAuthenticated,
    UpdateCommentValidator,
    commentController.update_A_Comment
  )

  // delete a post
  .delete("/:postitId/comments/:commentId", isAuthenticated, commentController.delete_A_Comment);

export default commentRouter;
