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
const user_service_1 = require("../user.service");
const models_1 = require("../../../models");
const hash_manager_1 = require("../../../utils/hash-manager");
const util_1 = require("../util");
const logger_1 = __importDefault(require("../../../utils/logger"));
const response_format_1 = require("../../../utils/response-format");
const mockHashManager = {
    hash: jest.fn(),
};
jest.mock("../../../models/users/user.models", () => ({
    create: jest.fn(),
    findOne: jest.fn(),
}));
jest.mock("../../../utils/hash-manager", () => ({
    hashManager: () => mockHashManager,
}));
jest.mock("../util", () => ({
    mapUserStoreModelToDTO: jest.fn(),
}));
jest.mock("../../../utils/response-format", () => ({
    formatResponse: jest.fn(),
}));
describe("create-user", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const date = new Date().toString();
    it("should create a new user and return success response", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPayload = {
            email: "test@test.com",
            password: "password",
            firstname: "test",
            lastname: "test",
            mobile: "phone",
        };
        const mockUser = {
            _id: "123",
            email: mockPayload.email,
            firstname: mockPayload.firstname,
            lastname: mockPayload.lastname,
            mobile: mockPayload.mobile,
            password: "password",
            createdAt: date,
            updatedAt: date,
        };
        models_1.User.findOne.mockResolvedValue(null);
        models_1.User.create.mockResolvedValue(mockUser);
        (0, hash_manager_1.hashManager)().hash.mockResolvedValue(mockUser.password);
        util_1.mapUserStoreModelToDTO.mockImplementation(() => mockPayload);
        response_format_1.formatResponse.mockReturnValue({ isSuccess: true });
        const result = yield (0, user_service_1.createUser)(mockPayload);
        expect(models_1.User.findOne).toHaveBeenCalledWith({ email: mockPayload.email });
        expect((0, hash_manager_1.hashManager)().hash).toHaveBeenCalledWith("password");
        expect(models_1.User.create).toHaveBeenCalled();
        expect(util_1.mapUserStoreModelToDTO).toHaveBeenCalled();
        expect(result.isSuccess).toEqual(true);
    }));
    it("should return an error response when the user already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPayload = {
            email: "test@test.com",
            password: "password",
            firstname: "test",
            lastname: "test",
            mobile: "phone",
        };
        const mockUser = {
            _id: "123",
            email: mockPayload.email,
            firstname: mockPayload.firstname,
            lastname: mockPayload.lastname,
            mobile: mockPayload.mobile,
            password: "password",
            createdAt: date,
            updatedAt: date,
        };
        models_1.User.findOne.mockResolvedValue(mockUser);
        models_1.User.create.mockResolvedValue(mockUser);
        util_1.mapUserStoreModelToDTO.mockImplementation(() => { });
        response_format_1.formatResponse.mockReturnValue({
            isSuccess: false,
            message: "User constants.errorMessage.exist",
        });
        const result = yield (0, user_service_1.createUser)(mockPayload);
        expect(models_1.User.findOne).toHaveBeenCalledWith({ email: mockPayload.email });
        expect(util_1.mapUserStoreModelToDTO).not.toHaveBeenCalled();
        expect((0, hash_manager_1.hashManager)().hash).not.toHaveBeenCalled();
        expect(result).toEqual({
            isSuccess: false,
            message: "User constants.errorMessage.exist",
        });
    }));
    it("should return an error response when an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPayload = {
            email: "test@test.com",
            password: "password",
            firstname: "test",
            lastname: "test",
            mobile: "phone",
        };
        const ErrorMessage = "Error occured";
        models_1.User.findOne.mockResolvedValue(new Error(ErrorMessage));
        response_format_1.formatResponse.mockReturnValue({
            isSuccess: false,
            message: "User constants.errorMessage.exist",
        });
        const result = yield (0, user_service_1.createUser)(mockPayload);
        expect(models_1.User.findOne).toHaveBeenCalledWith({ email: mockPayload.email });
        expect(util_1.mapUserStoreModelToDTO).not.toHaveBeenCalled();
        expect((0, hash_manager_1.hashManager)().hash).not.toHaveBeenCalled();
        expect(result).toEqual({
            isSuccess: false,
            message: "User constants.errorMessage.exist",
        });
    }));
    it("should return an error response when an exception occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPayload = {
            email: "test@test.com",
            password: "password",
            firstname: "test",
            lastname: "test",
            mobile: "phone",
        };
        models_1.User.findOne.mockRejectedValue(new Error("Test error"));
        models_1.User.create.mockRejectedValue(new Error("Test error"));
        logger_1.default.error = jest.fn();
        const result = yield (0, user_service_1.createUser)(mockPayload);
        expect(result.isSuccess).toBe(false);
        expect(logger_1.default.error).toHaveBeenCalledWith(expect.any(Error));
    }));
});
//# sourceMappingURL=create-user.test.js.map