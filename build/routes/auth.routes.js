"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../utilities/validatorHandles/auth");
const authentication_1 = __importDefault(require("../controllers/authentication"));
const authRouter = express_1.default.Router();
// const signupValidator = new AuthValidators("signup")
authRouter
    .post("/signup", auth_1.SignupValidator, authentication_1.default.signup)
    .post("/login", auth_1.LoginValidator, authentication_1.default.login);
exports.default = authRouter;
