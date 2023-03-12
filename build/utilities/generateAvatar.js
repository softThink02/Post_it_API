"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAvatar = void 0;
const core_1 = require("@dicebear/core");
const collection_1 = require("@dicebear/collection");
const generateAvatar = () => {
    const avatar = (0, core_1.createAvatar)(collection_1.lorelei, {
        seed: 'John Doe',
        // ... other options
    });
    const svg = avatar.toString();
    console.log(svg);
};
exports.generateAvatar = generateAvatar;
