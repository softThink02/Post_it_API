"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommentValidator = exports.CreateCommentValidator = void 0;
const express_validator_1 = require("express-validator");
exports.CreateCommentValidator = [
    (0, express_validator_1.body)("text", "Provide a text")
        .not()
        .isEmpty(),
];
exports.UpdateCommentValidator = [
    (0, express_validator_1.body)("text", "Provide a text")
        .not()
        .isEmpty(),
];
