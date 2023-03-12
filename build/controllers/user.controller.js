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
const user_services_1 = __importDefault(require("../services/user.services"));
// import { generateAvatar } from "../utilities/generateAvatar";
const userQueryParamsHandler = (userId_username) => {
    let userQueryParameter;
    /**
     * check if the params contains @ symbol, if true then paramter is a username
     * else then query is the userId
     */
    if (userId_username.includes("@")) {
        userQueryParameter = {
            queryType: "username", queryValue: userId_username.split("@")[1]
        };
    }
    else {
        userQueryParameter = {
            queryType: "id", queryValue: userId_username
        };
    }
    return userQueryParameter;
};
class USER_CONTROLLER {
    // get all users
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // generateAvatar()
            try {
                const users = yield user_services_1.default.getAllUsers();
                users ?
                    res
                        .status(200)
                        .json({ data: users, success: true })
                    : res
                        .status(400)
                        .json({ message: "An error occured, try again later", success: false });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
    // get one user
    findOneUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // get the request parameter
            const userId_username = req.params.userId_username;
            let userQueryParameter = userQueryParamsHandler(userId_username);
            try {
                const user = yield user_services_1.default.findOneUser(userQueryParameter);
                user ?
                    res
                        .status(200)
                        .json({ data: user, success: true })
                    : res
                        .status(400)
                        .json({ message: "User not found", success: false });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
    // update a user
    update_A_User(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const updateFields = req.body;
            try {
                // check for errors thrown from validators
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    let error = new Error(errors.array()[0].msg);
                    error.statusCode = 400;
                    throw error;
                }
                const updatedUser = yield user_services_1.default.updateUser(userId, updateFields);
                updatedUser ?
                    res
                        .status(200)
                        .json({ data: updatedUser, success: true })
                    : res
                        .status(400)
                        .json({ message: "User not found", success: false });
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
    // delete a postit
    delete_A_User(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            try {
                const deletedUser = yield user_services_1.default.deleteUser(userId);
                deletedUser ?
                    res
                        .status(200)
                        .json({ message: "User deleted", success: true })
                    : res
                        .status(400)
                        .json({ message: "User not found", success: false });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new USER_CONTROLLER();
