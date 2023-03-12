import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import userLookupService from "../services/userLookup.service";
import { IErrorObj } from "../interfaces/error.interface";
import { IUserQueryProps } from "../interfaces/user.interface";


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

class USER_LOOKUP_CONTROLLER {
    // get all postits of a user
    async getAllUsersPostits(req: Request, res: Response, next: NextFunction) {
        // get the request parameter
        const userId_username: string = req.params.userId_username;
        let userQueryParameter = userQueryParamsHandler(userId_username)

        try {
            const postits = await userLookupService.getAllUserPostit(userQueryParameter)
            postits ?
                res
                    .status(200)
                    .json({ data: postits, success: true })
                : res
                    .status(400)
                    .json({ message: "Postit not found", success: false });
        } catch (err) {
            next(err)
        }
    };
}

export default new USER_LOOKUP_CONTROLLER();
