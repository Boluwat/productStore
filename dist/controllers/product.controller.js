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
exports.getProductController = exports.deleteProductController = exports.updateProductController = exports.getAllProductController = exports.createProductController = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const response_format_1 = require("../utils/response-format");
const product_service_1 = require("../services/product-service/product.service");
const tokenizer_1 = require("../utils/tokenizer");
const createProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers["authorization"];
        const validationResponse = (0, tokenizer_1.verify)(authorizationHeader);
        if (!validationResponse.isSuccess) {
            return res.status(400).json(validationResponse);
        }
        const response = yield (0, product_service_1.createProductService)(req.body);
        if (!response.isSuccess) {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    }
    catch (err) {
        logger_1.default.error(err);
        return res
            .status(400)
            .json((0, response_format_1.formatResponse)({ message: "You just hit a break wall" }));
    }
});
exports.createProductController = createProductController;
const getAllProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, page } = req.query;
        const limitNum = limit || 50;
        const pageNum = page || 1;
        const skip = limitNum * (pageNum - 1);
        const response = yield (0, product_service_1.getAllProductsService)({ limit, skip });
        if (!response.isSuccess) {
            return res.status(400).json(response);
        }
        res.status(200).json(response);
    }
    catch (error) {
        logger_1.default.error(error);
        res
            .status(400)
            .json((0, response_format_1.formatResponse)({ message: "You just hit a break wall" }));
    }
});
exports.getAllProductController = getAllProductController;
const updateProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers["authorization"];
        const validationResponse = (0, tokenizer_1.verify)(authorizationHeader);
        if (!validationResponse.isSuccess) {
            return res.status(400).json(validationResponse);
        }
        const response = yield (0, product_service_1.updateProductService)(req.body, req.query);
        if (!response.isSuccess) {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    }
    catch (err) {
        logger_1.default.error(err);
        return res
            .status(400)
            .json((0, response_format_1.formatResponse)({ message: "You just hit a break wall" }));
    }
});
exports.updateProductController = updateProductController;
const deleteProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers["authorization"];
        const validationResponse = (0, tokenizer_1.verify)(authorizationHeader);
        if (!validationResponse.isSuccess) {
            return res.status(400).json(validationResponse);
        }
        const response = yield (0, product_service_1.deleteProductsService)({ id: req.params.id });
        if (!response.isSuccess) {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    }
    catch (err) {
        logger_1.default.error(err);
        return res
            .status(400)
            .json((0, response_format_1.formatResponse)({ message: "You just hit a break wall" }));
    }
});
exports.deleteProductController = deleteProductController;
const getProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers["authorization"];
        const validationResponse = (0, tokenizer_1.verify)(authorizationHeader);
        if (!validationResponse.isSuccess) {
            return res.status(400).json(validationResponse);
        }
        const response = yield (0, product_service_1.getProductsService)({ id: req.params.id });
        if (!response.isSuccess) {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    }
    catch (err) {
        logger_1.default.error(err);
        return res
            .status(400)
            .json((0, response_format_1.formatResponse)({ message: "You just hit a break wall" }));
    }
});
exports.getProductController = getProductController;
//# sourceMappingURL=product.controller.js.map