"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductsService = exports.getProductsService = exports.getAllProductsService = exports.updateProductService = exports.createProductService = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const models_1 = require("../../models");
const response_format_1 = require("../../utils/response-format");
const util_1 = require("./util");
const createProductService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield models_1.Product.findOne({ name: payload.name });
        if (product) {
            return (0, response_format_1.formatResponse)({
                isSuccess: false,
                message: "Product records exist",
            });
        }
        const newProduct = yield models_1.Product.create(payload);
        return (0, response_format_1.formatResponse)({
            isSuccess: true,
            data: (0, util_1.mapProductStoreModelToDTO)(newProduct),
            message: "Product created succesfully",
        });
    }
    catch (err) {
        logger_1.default.error(err);
        return (0, response_format_1.formatResponse)({
            isSuccess: false,
            message: "You just hit a break wall",
        });
    }
});
exports.createProductService = createProductService;
const updateProductService = (payload, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield models_1.Product.findOne({ _id: query.id });
        if (!product) {
            return (0, response_format_1.formatResponse)({
                isSuccess: false,
                message: "Product records not found",
            });
        }
        const value = yield models_1.Product.findByIdAndUpdate(query.id, payload, {
            new: true,
        });
        return (0, response_format_1.formatResponse)({
            isSuccess: true,
            data: (0, util_1.mapProductStoreModelToDTO)(value),
            message: "Product updated successfully",
        });
    }
    catch (err) {
        logger_1.default.error(err);
        return (0, response_format_1.formatResponse)({
            isSuccess: false,
            message: "You just hit a break wall",
        });
    }
});
exports.updateProductService = updateProductService;
const getAllProductsService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ limit = 50, skip = 0, }) {
    try {
        const query = { status: { $ne: "INACTIVE" } };
        const options = { skip, limit, sort: { name: -1 } };
        const totalCount = yield models_1.Product.countDocuments(query);
        const products = yield models_1.Product.find(query, {}, options);
        const pageCount = Math.ceil(totalCount / limit);
        return (0, response_format_1.formatResponse)({
            isSuccess: true,
            data: {
                products: products.map((product) => (0, util_1.mapProductStoreModelToDTO)(product.toObject())),
                pageCount,
                totalCount,
            },
        });
    }
    catch (error) {
        logger_1.default.error(error);
        return (0, response_format_1.formatResponse)({
            message: "You just hit a break wall",
        });
    }
});
exports.getAllProductsService = getAllProductsService;
const getProductsService = (_b) => __awaiter(void 0, [_b], void 0, function* ({ id, }) {
    try {
        const product = yield models_1.Product.findOne({ _id: id });
        if (!product) {
            return (0, response_format_1.formatResponse)({
                isSuccess: false,
                message: "Product records not found",
            });
        }
        return (0, response_format_1.formatResponse)({
            isSuccess: true,
            data: (0, util_1.mapProductStoreModelToDTO)(product),
        });
    }
    catch (err) {
        logger_1.default.error(err);
        return (0, response_format_1.formatResponse)({
            isSuccess: false,
            message: "You just hit a break wall",
        });
    }
});
exports.getProductsService = getProductsService;
const deleteProductsService = (_c) => __awaiter(void 0, [_c], void 0, function* ({ id, }) {
    try {
        const product = yield models_1.Product.findOneAndUpdate({
            _id: id,
        }, {
            status: "INACTIVE",
        }, {
            new: true,
        });
        if (!product) {
            return (0, response_format_1.formatResponse)({
                isSuccess: false,
                message: "Product records not found",
            });
        }
        return (0, response_format_1.formatResponse)({
            isSuccess: true,
            data: (0, util_1.mapProductStoreModelToDTO)(product),
        });
    }
    catch (err) {
        logger_1.default.error(err);
        return (0, response_format_1.formatResponse)({
            isSuccess: false,
            message: "You just hit a break wall",
        });
    }
});
exports.deleteProductsService = deleteProductsService;
//# sourceMappingURL=product.service.js.map