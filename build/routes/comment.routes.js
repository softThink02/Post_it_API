"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = __importDefault(require("../controllers/comment.controller"));
const comment_valid_1 = require("../utilities/validatorHandles/comment.valid");
const authenticator_1 = __importDefault(require("../middleware/authenticator"));
const commentRouter = express_1.default.Router();
commentRouter
    // add comment to a postit
    .post("/:postitId/comments", authenticator_1.default, comment_valid_1.CreateCommentValidator, comment_controller_1.default.createComment)
    // get all comments of a particular postit
    .get("/:postitId/comments", comment_controller_1.default.getAllComments)
    // get a single comment of a particular postit
    .get("/:postitId/comments/:commentId", comment_controller_1.default.findOneComment)
    // update a comment of a particular postit
    .put("/:postitId/comments/:commentId", authenticator_1.default, comment_valid_1.UpdateCommentValidator, comment_controller_1.default.update_A_Comment)
    // delete a post
    .delete("/:postitId/comments/:commentId", authenticator_1.default, comment_controller_1.default.delete_A_Comment);
exports.default = commentRouter;
