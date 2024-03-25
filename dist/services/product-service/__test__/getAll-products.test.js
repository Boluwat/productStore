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
const response_format_1 = require("../../../utils/response-format");
const logger_1 = __importDefault(require("../../../utils/logger"));
const date = new Date();
const mockProduct = [
    {
        _id: "123",
        name: "mockPayload.name",
        description: "mockPayload.description",
        price: 100,
        quantity: 5,
        status: 'ACTIVE',
        createdAt: date,
        updatedAt: date,
    },
];
jest.mock("../../../utils/logger", () => ({
    error: jest.fn(),
}));
jest.mock("../../../models/products/product.models", () => ({
    countDocuments: jest.fn().mockReturnValue(10),
    find: jest.fn(),
}));
jest.mock("../util", () => ({
    mapProductStoreModelToDTO: jest.fn(),
}));
jest.mock("../../../utils/response-format", () => ({
    formatResponse: jest.fn(),
}));
describe("getAllProductsService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should return a successful response with products and pagination data", () => __awaiter(void 0, void 0, void 0, function* () {
        const limit = 50;
        const skip = 0;
        const pageCount = 1;
        util_1.mapProductStoreModelToDTO.mockImplementation(() => mockProduct[0]);
        const result = yield (0, product_service_1.getAllProductsService)({ limit, skip });
        // expect(mapProductStoreModelToDTO).toHaveBeenCalledTimes(mockProduct.length);
        expect(result).toEqual((0, response_format_1.formatResponse)({
            isSuccess: true,
            data: {
                products: mockProduct,
                pageCount,
                totalCount: 10,
            },
        }));
    }));
    it("should handle errors and return an error response", () => __awaiter(void 0, void 0, void 0, function* () {
        const limit = 1;
        const skip = 0;
        const errorMessage = "An error occurred";
        jest
            .spyOn(models_1.Product, "countDocuments")
            .mockRejectedValue(new Error(errorMessage));
        const result = yield (0, product_service_1.getAllProductsService)({ limit, skip });
        expect(result).toEqual((0, response_format_1.formatResponse)({
            message: "You just hit a break wall",
        }));
        expect(util_1.mapProductStoreModelToDTO).not.toHaveBeenCalledWith({});
        expect(logger_1.default.error).toHaveBeenCalledWith(new Error(errorMessage));
    }));
});
//# sourceMappingURL=getAll-products.test.js.map