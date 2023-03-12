// get all posts
// get a single post
// update a post
// delete a post

import { Postit, User } from "../models";
import { IPostit } from "../interfaces/post.interface";
import { IErrorObj } from "../interfaces/error.interface";
import { IUserQueryProps } from "../interfaces/user.interface";

class POST_MANAGER {

  // create a postit
  async createPostit(postData: IPostit) {
    try {
      const newPost = new Postit({
        ...postData,
      });
      return await newPost.save();
    } catch (err) {
      throw err;
    }
  }

  // get all postits
  async getAllPostit() {
    try {
      return await Postit.find({ deleted: false })
        .populate({ path: "creator", select: "username profilePicture" })
        .select("-deleted")
        .lean()
        .sort({ createdAt: -1 })
    } catch (err) {
      throw err;
    }
  }

  // find one postit
  async findOnePostit(id: string) {
    try {
      return await Postit.findOne({ $and: [{ _id: id }, { deleted: false }] })
        .populate({ path: "creator", select: "username profilePicture" })
        .select("-deleted")
        .lean();
    } catch (err) {
      throw err;
    }
  }

  // Update a postit
  async updatePostit(userId: string, id: string, newData: Partial<IPostit>) {
    try {
      let postit = await Postit.findOne({ creator: userId, _id: id });
      // check if the current user is the owner of the postit
      if (!postit) {
        let error: IErrorObj = new Error("This postit doesn't belong to you")
        error.statusCode = 400
        throw error
      }
      if (postit.deleted) {
        let error: IErrorObj = new Error("Postit not found")
        error.statusCode = 400
        throw error
      }

      return await Postit.findOneAndUpdate(
        { creator: userId }, newData, { new: true }
      );
    } catch (err) {
      throw err;
    }
  }

  // Method for deleting a postit
  async deletePostit(userId: string, id: string) {
    try {

      // Apply soft delete on this postit
      const postit = await Postit.findOne({ creator: userId, _id: id });

      // check if the current user is the owner of the postit
      if (!postit) {
        let error: IErrorObj = new Error("This postit doesn't belong to you")
        error.statusCode = 400
        throw error
      }
      // check if this postit has been deleted previously
      if (postit.deleted) {
        let error: IErrorObj = new Error("Postit not found")
        error.statusCode = 400
        throw error
      }
      return await postit.updateOne({ deleted: true }, { new: true })
    } catch (err) {
      throw err;
    }
  }
}

export default new POST_MANAGER();
