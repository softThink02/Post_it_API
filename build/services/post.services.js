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
class POST_MANAGER {
    // create a postit
    createPostit(postData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPost = new models_1.Postit(Object.assign({}, postData));
                return yield newPost.save();
            }
            catch (err) {
                throw err;
            }
        });
    }
    // get all postits
    getAllPostit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.Postit.find({ deleted: false })
                    .populate({ path: "creator", select: "username profilePicture" })
                    .select("-deleted")
                    .lean()
                    .sort({ createdAt: -1 });
            }
            catch (err) {
                throw err;
            }
        });
    }
    // find one postit
    findOnePostit(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.Postit.findOne({ $and: [{ _id: id }, { deleted: false }] })
                    .populate({ path: "creator", select: "username profilePicture" })
                    .select("-deleted")
                    .lean();
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Update a postit
    updatePostit(userId, id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let postit = yield models_1.Postit.findOne({ creator: userId, _id: id });
                // check if the current user is the owner of the postit
                if (!postit) {
                    let error = new Error("This postit doesn't belong to you");
                    error.statusCode = 400;
                    throw error;
                }
                if (postit.deleted) {
                    let error = new Error("Postit not found");
                    error.statusCode = 400;
                    throw error;
                }
                return yield models_1.Postit.findOneAndUpdate({ creator: userId }, newData, { new: true });
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Method for deleting a postit
    deletePostit(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Apply soft delete on this postit
                const postit = yield models_1.Postit.findOne({ creator: userId, _id: id });
                // check if the current user is the owner of the postit
                if (!postit) {
                    let error = new Error("This postit doesn't belong to you");
                    error.statusCode = 400;
                    throw error;
                }
                // check if this postit has been deleted previously
                if (postit.deleted) {
                    let error = new Error("Postit not found");
                    error.statusCode = 400;
                    throw error;
                }
                return yield postit.updateOne({ deleted: true }, { new: true });
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = new POST_MANAGER();
