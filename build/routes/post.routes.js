"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const posts_valid_1 = require("../utilities/validatorHandles/posts.valid");
const authenticator_1 = __importDefault(require("../middleware/authenticator"));
const comment_routes_1 = __importDefault(require("./comment.routes"));
const postRouter = express_1.default.Router();
postRouter
    // use the comment routes here since it's a child of postit
    .use(comment_routes_1.default)
    // create post
    .post("", authenticator_1.default, posts_valid_1.CreatePostValidator, post_controller_1.default.createPostit)
    // get all posts
    .get("", post_controller_1.default.getAllPostits)
    // get a single post
    .get("/:postitId", post_controller_1.default.findOnePostit)
    // update a post
    .put("/:postitId", authenticator_1.default, posts_valid_1.UpdatePostValidator, post_controller_1.default.update_A_Postit)
    // delete a post
    .delete("/:postitId", authenticator_1.default, post_controller_1.default.delete_A_Postit);
exports.default = postRouter;
