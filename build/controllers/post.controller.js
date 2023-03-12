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
const post_services_1 = __importDefault(require("../services/post.services"));
class POST_CONTROLLER {
    // create new postits
    createPostit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const postitData = req.body;
            const creator = req.userId;
            try {
                // check for errors thrown from validators
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    let error = new Error(errors.array()[0].msg);
                    error.statusCode = 400;
                    throw error;
                }
                // create a new post...
                const newPost = yield post_services_1.default.createPostit(Object.assign(Object.assign({}, postitData), { creator }));
                newPost ?
                    res
                        .status(200)
                        .json({ message: "Post successfully created", data: newPost, success: true })
                    : res
                        .status(400)
                        .json({ message: "An error occured", success: false });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // get all postits
    getAllPostits(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postits = yield post_services_1.default.getAllPostit();
                postits ?
                    res
                        .status(200)
                        .json({ data: postits, success: true })
                    : res
                        .status(400)
                        .json({ message: "Postit not found", success: false });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
    // get one postit
    findOnePostit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const postitId = req.params.postitId;
            try {
                const postit = yield post_services_1.default.findOnePostit(postitId);
                postit ?
                    res
                        .status(200)
                        .json({ data: postit, success: true })
                    : res
                        .status(400)
                        .json({ message: "Postit not found", success: false });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
    // update a postit
    update_A_Postit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const postitId = req.params.postitId;
            const postitBody = req.body;
            try {
                // check for errors thrown from validators
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    let error = new Error(errors.array()[0].msg);
                    error.statusCode = 400;
                    throw error;
                }
                // update the postit with the postit service
                const updatedPostit = yield post_services_1.default
                    .updatePostit(req.userId, postitId, postitBody);
                // send response after postit has been updated
                updatedPostit &&
                    res
                        .status(200)
                        .json({ data: updatedPostit, success: true });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
    // delete a postit
    delete_A_Postit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const postitId = req.params.postitId;
            try {
                const deletePostit = yield post_services_1.default.deletePostit(req.userId, postitId);
                deletePostit &&
                    res
                        .status(200)
                        .json({ message: "Postit deleted", success: true });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
}
exports.default = new POST_CONTROLLER();
