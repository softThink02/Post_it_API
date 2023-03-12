// get all posts
// get a single post
// update a post
// delete a post

import { Comment, Postit } from "../models";
import { IComment } from "../interfaces/comment.interface";
import { IErrorObj } from "../interfaces/error.interface";

class COMMENT_MANAGER {

  // create a comment
  async createComment(commentData: IComment) {
    try {
      // make sure the postit exists
      const existingPostit = await Postit.findOne({ _id: commentData.postId })
      if (!existingPostit) {
        let error: IErrorObj = new Error("Postit not found")
        error.statusCode = 400
        throw error
      }
      const newComment = new Comment({
        ...commentData,
      });
      return await newComment.save();
    } catch (err) {
      throw err;
    }
  }

  // get all comments of a postit
  async getComments(postitId: string) {
    try {
      return await Comment.find({ postId: postitId, deleted: false })
        .populate({ path: "commentator", select: "username" })
        .select("-deleted")
        .lean()
        .sort({ createdAt: -1 })
    } catch (err) {
      throw err;
    }
  }

  // find one comment of a postit
  async findComment(postitId: string, commentId: string) {
    try {
      return await Comment.findOne(
        { _id: commentId, postId: postitId, deleted: false }
      )
        .populate({ path: "commentator", select: "username" })
        .select("-deleted")
        .lean();
    } catch (err) {
      throw err;
    }
  }

  // Update a comment of a postit
  async updateComment(
    userId: string,
    postitId: string,
    commentId: string,
    newData: Partial<IComment>
  ) {

    try {
      let comment = await Comment.findOne(
        { postId: postitId, _id: commentId, commentator: userId }
      );
      // check if the current user is the owner of this comment
      if (!comment) {
        let error: IErrorObj = new Error("This comment doesn't belong to you")
        error.statusCode = 400
        throw error
      }
      if (comment.deleted) {
        let error: IErrorObj = new Error("Comment not found")
        error.statusCode = 400
        throw error
      }

      return await Comment.findOneAndUpdate({ _id: commentId }, newData, { new: true });
    } catch (err) {
      throw err;
    }
  }

  // Method for deleting a postit's comment
  async deleteComment(userId: string, postitId: string, commentId: string) {
    try {

      // Apply soft delete on this comment
      const comment = await Comment.findOne(
        { commentator: userId, _id: commentId, postId: postitId }
      );

      // check if the current user is the owner of the comment
      if (!comment) {
        let error: IErrorObj = new Error("This comment doesn't belong to you")
        error.statusCode = 400
        throw error
      }
      // check if this comment has been deleted previously
      if (comment.deleted) {
        let error: IErrorObj = new Error("Comment not found")
        error.statusCode = 400
        throw error
      }
      return await comment.updateOne({ deleted: true }, { new: true })
    } catch (err) {
      throw err;
    }
  }
}

export default new COMMENT_MANAGER();
