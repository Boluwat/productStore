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
const mockPayload = {
    name: "name",
    description: "user",
    price: 10,
    quantity: 5,
};
const date = new Date();
const mockProduct = {
    _id: "123",
    name: mockPayload.name,
    description: mockPayload.description,
    price: mockPayload.price,
    quantity: mockPayload.quantity,
    createdAt: date,
    updatedAt: date,
};
jest.mock("../../../models/products/product.models", () => ({
    create: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
}));
jest.mock("../util", () => ({
    mapProductStoreModelToDTO: jest.fn(),
}));
jest.mock("../../../utils/response-format", () => ({
    formatResponse: jest.fn(),
}));
describe("create-product", () => {
    // Restore mocks after each test
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should create a new product and return success response", () => __awaiter(void 0, void 0, void 0, function* () {
        models_1.Product.findOne.mockResolvedValue(null);
        models_1.Product.create.mockResolvedValue(mockProduct);
        util_1.mapProductStoreModelToDTO.mockImplementation(() => mockPayload);
        response_format_1.formatResponse.mockReturnValue({ isSuccess: true });
        const result = yield (0, product_service_1.createProductService)(mockPayload);
        expect(models_1.Product.findOne).toHaveBeenCalledWith({ name: mockPayload.name });
        expect(models_1.Product.create).toHaveBeenCalled();
        expect(util_1.mapProductStoreModelToDTO).toHaveBeenCalled();
        expect(result.isSuccess).toEqual(true);
    }));
    it("should return an error response when the product already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        models_1.Product.findOne.mockResolvedValue(mockProduct);
        util_1.mapProductStoreModelToDTO.mockImplementation(() => { });
        response_format_1.formatResponse.mockReturnValue({
            isSuccess: false,
            message: "Product records exist",
        });
        const result = yield (0, product_service_1.createProductService)(mockPayload);
        expect(models_1.Product.findOne).toHaveBeenCalledWith({ name: mockPayload.name });
        expect(models_1.Product.create).not.toHaveBeenCalled();
        expect(util_1.mapProductStoreModelToDTO).not.toHaveBeenCalled();
        expect(result).toEqual({
            isSuccess: false,
            message: "Product records exist",
        });
    }));
    it("should return an error response when an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        const ErrorMessage = "Error occured";
        models_1.Product.findOne.mockResolvedValue(new Error(ErrorMessage));
        response_format_1.formatResponse.mockReturnValue({
            isSuccess: false,
            message: "You just hit a break wall",
        });
        const result = yield (0, product_service_1.createProductService)(mockPayload);
        expect(models_1.Product.findOne).toHaveBeenCalledWith({ name: mockPayload.name });
        expect(util_1.mapProductStoreModelToDTO).not.toHaveBeenCalled();
        expect(result).toEqual({
            isSuccess: false,
            message: "You just hit a break wall",
        });
    }));
});
//# sourceMappingURL=create-product.test.js.map