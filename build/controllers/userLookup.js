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
const userLookup_service_1 = __importDefault(require("../services/userLookup.service"));
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
class USER_LOOKUP_CONTROLLER {
    // get all postits of a user
    getAllUsersPostits(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // get the request parameter
            const userId_username = req.params.userId_username;
            let userQueryParameter = userQueryParamsHandler(userId_username);
            try {
                const postits = yield userLookup_service_1.default.getAllUserPostit(userQueryParameter);
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
}
exports.default = new USER_LOOKUP_CONTROLLER();
