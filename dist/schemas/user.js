"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayloadSchema = exports.loginPayloadSchema = void 0;
const zod_1 = require("zod");
exports.loginPayloadSchema = (0, zod_1.object)({
    email: (0, zod_1.string)({
        required_error: "Email is required.",
    }).email(),
    password: (0, zod_1.string)({
        required_error: "Password is required.",
    }),
});
exports.createPayloadSchema = (0, zod_1.object)({
    email: (0, zod_1.string)({
        required_error: "Email is required.",
    }).email(),
    password: (0, zod_1.string)({
        required_error: "Password is required.",
    }),
    firstname: (0, zod_1.string)({
        required_error: "Firstname is required.",
    }),
    lastname: (0, zod_1.string)({
        required_error: "Lastname is required.",
    }),
    mobile: (0, zod_1.string)({
        required_error: "Phone number is required.",
    }),
});
//# sourceMappingURL=user.js.map