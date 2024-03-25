"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapProductStoreModelToDTO = void 0;
const mapProductStoreModelToDTO = (product) => ({
    id: product._id.toString(),
    name: product.name,
    status: product.status,
    price: product.price,
    quantity: product.quantity,
    description: product.description,
    createdAt: product === null || product === void 0 ? void 0 : product.createdAt,
    updatedAt: product === null || product === void 0 ? void 0 : product.updatedAt,
});
exports.mapProductStoreModelToDTO = mapProductStoreModelToDTO;
//# sourceMappingURL=util.js.map