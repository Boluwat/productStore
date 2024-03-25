"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    status: {
        type: String,
        default: "ACTIVE",
        enum: ["ACTIVE", "INACTIVE"],
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        default: 0,
    },
}, {
    strict: "throw",
    timestamps: true,
});
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
//# sourceMappingURL=product.models.js.map