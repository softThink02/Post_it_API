"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./utilities/Database/database"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
// Register all routes below
app.use("/api/v1", routes_1.default);
// catch 404 and forward to error handler
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});
// error handler middleware
app.use((err, req, res, next) => {
    res
        .status(err.statusCode || 500)
        .json({ message: err.message, success: false });
});
const PORT = process.env.PORT || 2000;
(0, database_1.default)(() => {
    app.listen(PORT, () => console.log('connected!!!'));
});
exports.default = app;
