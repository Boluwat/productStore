"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.getProductSchema = exports.productSchema = void 0;
const zod_1 = require("zod");
exports.productSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({
        required_error: "Name is required.",
    }),
    description: (0, zod_1.string)({
        required_error: "Description is required.",
    }),
    quantity: (0, zod_1.number)({
        required_error: "Quantity is required.",
    }),
    price: (0, zod_1.number)({
        required_error: "Price is required.",
    }),
});
exports.getProductSchema = (0, zod_1.object)({
    id: (0, zod_1.string)({
        required_error: "Id is required.",
    }),
});
exports.updateProductSchema = (0, zod_1.object)({
    name: (0, zod_1.string)().optional(),
    description: (0, zod_1.string)().optional(),
    quantity: (0, zod_1.number)().optional(),
    price: (0, zod_1.number)().optional(),
});
//# sourceMappingURL=products.js.map