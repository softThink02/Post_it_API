"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userLookup_1 = __importDefault(require("../controllers/userLookup"));
const userLookupRoutes = express_1.default.Router();
userLookupRoutes
    // get all posts belonging to a user: with handler(username) or ID
    .get("/:userId_username/postits", userLookup_1.default.getAllUsersPostits)
    // get a particular post belonging to particular user: 
    .get("/:userId_username/postits/:postitId")
    // get all comments belonging to a post of a particular user: 
    .get("/:userId_username/postits/:postitId/comments")
    // get a particular comment belonging to a post of a particular user: 
    .get("/:userId_username/postits/:postitId/comments/:commentId");
exports.default = userLookupRoutes;
