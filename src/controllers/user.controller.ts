import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { Postit } from "../models";
import { IErrorObj } from "../interfaces/error.interface";
import { IUserQueryProps } from "../interfaces/user.interface";
import UserServices from "../services/user.services";
import PostServices from "../services/post.services";
// import { generateAvatar } from "../utilities/generateAvatar";

const userQueryParamsHandler = (userId_username: string) => {
    let userQueryParameter: IUserQueryProps;

    /**
     * check if the params contains @ symbol, if true then paramter is a username
     * else then query is the userId
     */

    if (userId_username.includes("@")) {
        userQueryParameter = {
            queryType: "username", queryValue: userId_username.split("@")[1]
        }
    } else {
        userQueryParameter = {
            queryType: "id", queryValue: userId_username
        }
    }
    return userQueryParameter
}

class USER_CONTROLLER {

    // get all users
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        // generateAvatar()
        try {
            const users = await UserServices.getAllUsers()
            users ?
                res
                    .status(200)
                    .json({ data: users, success: true })
                : res
                    .status(400)
                    .json({ message: "An error occured, try again later", success: false });
        } catch (err) {
            next(err)
        }
    };

    // get one user
    async findOneUser(req: Request, res: Response, next: NextFunction) {
        // get the request parameter
        const userId_username: string = req.params.userId_username;
        let userQueryParameter = userQueryParamsHandler(userId_username)

        try {
            const user = await UserServices.findOneUser(userQueryParameter)
            user ?
                res
                    .status(200)
                    .json({ data: user, success: true })
                : res
                    .status(400)
                    .json({ message: "User not found", success: false });
        } catch (err) {
            next(err)
        }
    };

    // update a user
    async update_A_User(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;
        const updateFields = req.body;
        try {
            // check for errors thrown from validators
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let error: IErrorObj = new Error(errors.array()[0].msg);
                error.statusCode = 400;
                throw error;
            }

            const updatedUser = await UserServices.updateUser(userId, updateFields)
            updatedUser ?
                res
                    .status(200)
                    .json({ data: updatedUser, success: true })
                : res
                    .status(400)
                    .json({ message: "User not found", success: false });
        } catch (err) {
            next(err)
        }
    };

    // delete a postit
    async delete_A_User(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;
        try {
            const deletedUser = await UserServices.deleteUser(userId);

            deletedUser ?
                res
                    .status(200)
                    .json({ message: "User deleted", success: true })
                : res
                    .status(400)
                    .json({ message: "User not found", success: false });
        } catch (err) {
            next(err)
        }
    }
}

export default new USER_CONTROLLER();
