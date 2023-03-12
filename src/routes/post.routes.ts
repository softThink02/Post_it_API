import express from "express";
import postController from "../controllers/post.controller";
import { CreatePostValidator, UpdatePostValidator } from "../utilities/validatorHandles/posts.valid";
import isAuthenticated from "../middleware/authenticator";
import commentRouter from "./comment.routes";


const postRouter = express.Router()

postRouter
    // use the comment routes here since it's a child of postit
    .use(commentRouter)
    // create post
    .post("", isAuthenticated, CreatePostValidator, postController.createPostit)
    // get all posts
    .get("", postController.getAllPostits)
    // get a single post
    .get("/:postitId", postController.findOnePostit)
    // update a post
    .put("/:postitId", isAuthenticated, UpdatePostValidator, postController.update_A_Postit)
    // delete a post
    .delete("/:postitId", isAuthenticated, postController.delete_A_Postit)

export default postRouter;
