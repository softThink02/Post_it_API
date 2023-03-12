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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class POST_MANAGER {
    // get all users
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.User.find({ deleted: false })
                    .select("-password -deleted")
                    .lean()
                    .sort({ createdAt: -1 });
            }
            catch (err) {
                throw err;
            }
        });
    }
    // find one user
    findOneUser(userCredential) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.User.findOne({
                    $and: [
                        userCredential.queryType == "id" ?
                            { _id: userCredential.queryValue } : { username: userCredential.queryValue },
                        { deleted: false }
                    ]
                })
                    .select("-password -deleted")
                    .lean();
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Update a user
    updateUser(userId, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield models_1.User.findOne({ _id: userId });
                // check if the current user is the requested user to be deleted
                if (!user) {
                    let error = new Error("Can't update another user");
                    error.statusCode = 400;
                    throw error;
                }
                if (user.deleted) {
                    let error = new Error("User not found");
                    error.statusCode = 400;
                    throw error;
                }
                return yield models_1.User.findOneAndUpdate({ $and: [{ _id: userId }, { deleted: false }] }, newData, { new: true }).select("-password -deleted");
            }
            catch (err) {
                throw err;
            }
        });
    }
    // Method for deleting a user
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield models_1.User.findOne({ _id: userId });
                // check if the current user is the owner of the postit
                if (!user) {
                    let error = new Error("Can't delete another user");
                    error.statusCode = 400;
                    throw error;
                }
                if (user.deleted) {
                    let error = new Error("User not found");
                    error.statusCode = 400;
                    throw error;
                }
                // Apply soft delete on this user
                return yield user.updateOne({ deleted: true }, { new: true })
                    .select("-password -deleted");
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = new POST_MANAGER();
