"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Authorizer = (req, res, next) => {
    if (req.userRole !== "admin") {
        return res
            .status(401)
            .json({ message: "Not authorized to access resource", success: false });
    }
    next();
};
exports.default = Authorizer;
