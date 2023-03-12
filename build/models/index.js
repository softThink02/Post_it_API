"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.Postit = exports.User = void 0;
const user_model_1 = __importDefault(require("./user.model"));
exports.User = user_model_1.default;
const postit_model_1 = __importDefault(require("./postit.model"));
exports.Postit = postit_model_1.default;
const comment_model_1 = __importDefault(require("./comment.model"));
exports.Comment = comment_model_1.default;
