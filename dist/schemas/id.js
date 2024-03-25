"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idQuerySchema = void 0;
const zod_1 = require("zod");
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
exports.idQuerySchema = zod_1.z.object({
    id: (0, zod_1.string)({
        required_error: "id is required.",
    }).refine((value) => objectIdRegex.test(value), {
        message: "id must be a valid id (24 characters)",
    }),
});
//# sourceMappingURL=id.js.map