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
exports.UpdatePostValidator = exports.CreatePostValidator = void 0;
const express_validator_1 = require("express-validator");
exports.CreatePostValidator = [
    (0, express_validator_1.body)("title")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (value.toString().trim() === "") {
            throw new Error("Title must not be empty");
        }
        return true;
    })),
    (0, express_validator_1.body)("description")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (value.toString().trim() === "") {
            throw new Error("Description must not be empty");
        }
        return true;
    })),
];
exports.UpdatePostValidator = [
    (0, express_validator_1.body)("title")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (value.toString().trim() === "") {
            throw new Error("Title must not be empty");
        }
        return true;
    })),
    (0, express_validator_1.body)("description")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (value.toString().trim() === "") {
            throw new Error("Description must not be empty");
        }
        return true;
    })),
];
