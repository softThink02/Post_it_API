"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userLookup_routes_1 = __importDefault(require("./userLookup.routes"));
const authenticator_1 = __importDefault(require("../middleware/authenticator"));
const user_valid_1 = require("../utilities/validatorHandles/user.valid");
const userRouter = express_1.default.Router();
userRouter
    // register all user lookup routes here
    .use(userLookup_routes_1.default)
    // get all users
    .get("", user_controller_1.default.getAllUsers)
    // get a single user: with handler(username) or ID
    .get("/:userId_username", user_controller_1.default.findOneUser)
    // update a user
    .put("/:userId", authenticator_1.default, user_valid_1.UpdateUserValidator, user_controller_1.default.update_A_User)
    // delete user
    .delete("/:userId", authenticator_1.default, user_controller_1.default.delete_A_User);
exports.default = userRouter;
