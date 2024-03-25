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
// import { IUpdateProductDTO } from "../../../interfaces";
const response_format_1 = require("../../../utils/response-format");
const mockPayload = {
    name: "name",
};
const mockQuery = {
    id: "123"
};
const mockProduct = {
    _id: "123",
    name: mockPayload.name,
    description: 'mockPayload.description',
    price: 'mockPayload.price',
    quantity: 'mockPayload.quantity',
};
const updateProduct = Object.assign(Object.assign({}, mockQuery), mockPayload);
jest.mock("../../../models/products/product.models", () => ({
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
}));
jest.mock("../util", () => ({
    mapProductStoreModelToDTO: jest.fn(),
}));
jest.mock("../../../utils/response-format", () => ({
    formatResponse: jest.fn(),
}));
describe("update-product", () => {
    // Restore mocks after each test
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should update product and return success response", () => __awaiter(void 0, void 0, void 0, function* () {
        models_1.Product.findOne.mockResolvedValue(mockProduct);
        models_1.Product.findByIdAndUpdate.mockResolvedValue(updateProduct);
        util_1.mapProductStoreModelToDTO.mockReturnValue(mockProduct);
        response_format_1.formatResponse.mockReturnValue({ isSuccess: true });
        const result = yield (0, product_service_1.updateProductService)(mockPayload, mockQuery);
        expect(models_1.Product.findOne).toHaveBeenCalledWith({ _id: "123" });
        expect(result.isSuccess).toEqual(true);
    }));
    it('should return error response if product is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        models_1.Product.findOne.mockResolvedValueOnce(null);
        const result = yield (0, product_service_1.updateProductService)(mockPayload, mockQuery);
        expect(result).toEqual((0, response_format_1.formatResponse)({
            isSuccess: false,
            message: 'Product records not found',
        }));
    }));
    it('should return error response when encountering an error', () => __awaiter(void 0, void 0, void 0, function* () {
        models_1.Product.findOne.mockRejectedValueOnce(new Error('Database error'));
        const result = yield (0, product_service_1.updateProductService)(mockPayload, mockQuery);
        expect(result).toEqual((0, response_format_1.formatResponse)({
            isSuccess: false,
            message: 'You just hit a break wall',
        }));
    }));
});
//# sourceMappingURL=update-product.test.js.map