import express from "express";

import userController from "../controllers/user.controller";
import userLookupRoutes from "./userLookup.routes";
import isAuthenticated from "../middleware/authenticator";
import { UpdateUserValidator } from "../utilities/validatorHandles/user.valid";

const userRouter = express.Router()

userRouter
    // register all user lookup routes here
    .use(userLookupRoutes)
    // get all users
    .get("", userController.getAllUsers)

    // get a single user: with handler(username) or ID
    .get("/:userId_username", userController.findOneUser)

    // update a user
    .put("/:userId", isAuthenticated, UpdateUserValidator, userController.update_A_User)

    // delete user
    .delete("/:userId", isAuthenticated, userController.delete_A_User)


export default userRouter;
