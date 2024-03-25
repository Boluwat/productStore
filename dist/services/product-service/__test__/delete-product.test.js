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
const product_service_1 = require("../product.service");
const models_1 = require("../../../models");
const util_1 = require("../util");
// import { IUpdateProductDTO } from "../../../interfaces";
const response_format_1 = require("../../../utils/response-format");
const logger_1 = __importDefault(require("../../../utils/logger"));
const mockPayload = {
    name: "name",
};
const mockQuery = {
    id: "123",
};
const mockProduct = {
    _id: "123",
    name: mockPayload.name,
    description: "mockPayload.description",
    price: "mockPayload.price",
    quantity: "mockPayload.quantity",
    status: "ACTIVE",
};
jest.mock("../../../utils/logger", () => ({
    error: jest.fn(),
}));
jest.mock("../../../models/products/product.models", () => ({
    findOneAndUpdate: jest.fn(),
}));
jest.mock("../util", () => ({
    mapProductStoreModelToDTO: jest.fn(),
}));
jest.mock("../../../utils/response-format", () => ({
    formatResponse: jest.fn(),
}));
describe("delete-product", () => {
    // Restore mocks after each test
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should delete product and return success response", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the necessary functions
        models_1.Product.findOneAndUpdate.mockResolvedValue(mockProduct);
        util_1.mapProductStoreModelToDTO.mockReturnValue(mockProduct);
        response_format_1.formatResponse.mockReturnValue({ isSuccess: true });
        const result = yield (0, product_service_1.deleteProductsService)({ id: mockQuery.id });
        expect(models_1.Product.findOneAndUpdate).toHaveBeenCalledWith({ _id: mockQuery.id }, { status: "INACTIVE" }, { new: true });
        expect(util_1.mapProductStoreModelToDTO).toHaveBeenCalledWith(mockProduct);
        expect(result.isSuccess).toEqual(true);
    }));
    it("should return error response when product not found", () => __awaiter(void 0, void 0, void 0, function* () {
        models_1.Product.findOneAndUpdate.mockResolvedValue(null);
        response_format_1.formatResponse.mockReturnValue({ isSuccess: false });
        const result = yield (0, product_service_1.deleteProductsService)({ id: mockQuery.id });
        expect(result.isSuccess).toEqual(false);
    }));
    it("should return error response when an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Test error");
        models_1.Product.findOneAndUpdate.mockRejectedValue(mockError);
        logger_1.default.error.mockReturnValue(undefined);
        response_format_1.formatResponse.mockReturnValue({ isSuccess: false });
        const result = yield (0, product_service_1.deleteProductsService)({ id: mockQuery.id });
        expect(result.isSuccess).toEqual(false);
        expect(logger_1.default.error).toHaveBeenCalledWith(mockError);
    }));
});
//# sourceMappingURL=delete-product.test.js.map