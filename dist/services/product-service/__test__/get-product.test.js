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
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = require("../product.service");
const models_1 = require("../../../models");
const util_1 = require("../util");
const response_format_1 = require("../../../utils/response-format");
// import logger from "../../../utils/logger";
const date = new Date();
const mockProduct = {
    id: "123",
    name: "mockPayload.name",
    description: "mockPayload.description",
    price: 100,
    quantity: 5,
    status: "ACTIVE",
    createdAt: date,
    updatedAt: date,
};
jest.mock("../../../utils/logger", () => ({
    error: jest.fn(),
}));
jest.mock("../../../models/products/product.models", () => ({
    findOne: jest.fn(),
}));
jest.mock("../util", () => ({
    mapProductStoreModelToDTO: jest.fn(),
}));
jest.mock("../../../utils/response-format", () => ({
    formatResponse: jest.fn(),
}));
describe("getProductsService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should return a successful response if products is found", () => __awaiter(void 0, void 0, void 0, function* () {
        util_1.mapProductStoreModelToDTO.mockImplementation(() => mockProduct);
        const result = yield (0, product_service_1.getProductsService)({ id: "123" });
        expect(models_1.Product.findOne).toHaveBeenCalledWith({ _id: "123" });
        expect(result).toEqual((0, response_format_1.formatResponse)({
            isSuccess: true,
            data: {
                products: mockProduct,
            },
        }));
    }));
    it("should return an error response if product is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        models_1.Product.findOne.mockResolvedValue(null);
        response_format_1.formatResponse.mockReturnValue({
            isSuccess: false,
            message: "Product records not found",
        });
        const result = yield (0, product_service_1.getProductsService)({ id: "123" });
        expect(models_1.Product.findOne).toHaveBeenCalledWith({ _id: "123" });
        expect(result).toEqual((0, response_format_1.formatResponse)({
            isSuccess: false,
            message: "Product records not found",
        }));
        expect(util_1.mapProductStoreModelToDTO).not.toHaveBeenCalled();
        expect(result).toEqual({
            isSuccess: false,
            message: "Product records not found",
        });
    }));
    it("should return an error response when an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        const ErrorMessage = "Error occured";
        models_1.Product.findOne.mockResolvedValue(new Error(ErrorMessage));
        response_format_1.formatResponse.mockReturnValue({
            isSuccess: false,
            message: "You just hit a break wall",
        });
        const result = yield (0, product_service_1.getProductsService)({ id: "123" });
        expect(models_1.Product.findOne).toHaveBeenCalledWith({ _id: "123" });
        expect(util_1.mapProductStoreModelToDTO).toHaveBeenCalled();
        expect(result).toEqual({
            isSuccess: false,
            message: "You just hit a break wall",
        });
    }));
});
//# sourceMappingURL=get-product.test.js.map