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
exports.UpdateUserValidator = void 0;
const express_validator_1 = require("express-validator");
const models_1 = require("../../models");
exports.UpdateUserValidator = [
    (0, express_validator_1.body)("username", "Please provide a Username")
        .not()
        .isEmpty()
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield models_1.User.findOne({ username: value });
        if (existingUser) {
            throw new Error("Username taken, choose another.");
        }
        return true;
    })),
    (0, express_validator_1.body)("password")
        .isLength({ min: 8 })
        .withMessage("Password must be upto eight characters"),
    // body("profilePicture")
    //     .not()
    //     .isEmpty()
    //     .withMessage("Please provide a profile picture")
];
