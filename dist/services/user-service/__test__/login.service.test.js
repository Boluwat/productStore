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
const response_format_1 = require("../../../utils/response-format");
const logger_1 = __importDefault(require("../../../utils/logger"));
const login_util_service_1 = require("../login-util.service");
const util_1 = require("../util");
jest.mock('../../../models/users/user.models', () => ({
    findOne: jest.fn(),
}));
jest.mock('../login-util.service', () => ({
    generateLoginResponse: jest.fn(),
}));
jest.mock('../util', () => ({
    mapUserStoreModelToDTO: jest.fn(),
}));
const mockHashManager = {
    compare: jest.fn(),
};
jest.mock('../../../utils/hash-manager', () => ({
    hashManager: () => mockHashManager,
}));
jest.mock('../../../utils/response-format', () => ({
    formatResponse: jest.fn(),
}));
describe('loginService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return a success response when valid credentials are provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPayload = {
            email: 'test@example.com',
            password: 'password',
        };
        const mockUser = {
            email: 'test@example.com',
            password: 'hashedPassword',
        };
        models_1.User.findOne.mockResolvedValue(mockUser);
        (0, hash_manager_1.hashManager)().compare.mockResolvedValue(true);
        login_util_service_1.generateLoginResponse.mockImplementation(() => { });
        util_1.mapUserStoreModelToDTO.mockImplementation(() => { });
        response_format_1.formatResponse.mockReturnValue({ isSuccess: true });
        const result = yield (0, user_service_1.loginUser)(mockPayload);
        expect(result.isSuccess).toBe(true);
        expect(models_1.User.findOne).toHaveBeenCalledWith({ email: mockPayload.email });
        expect((0, hash_manager_1.hashManager)().compare).toHaveBeenCalledWith(mockPayload.password, mockUser.password);
        expect(login_util_service_1.generateLoginResponse).toHaveBeenCalled();
        expect(util_1.mapUserStoreModelToDTO).toHaveBeenCalled();
        expect(response_format_1.formatResponse).toHaveBeenCalledTimes(1);
    }));
    it('should return an error response when invalid credentials are provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPayload = {
            email: 'test@example.com',
            password: 'password',
        };
        models_1.User.findOne.mockResolvedValue(null);
        response_format_1.formatResponse.mockReturnValue({ isSuccess: false, message: 'Email or Password is Invalid', });
        const result = yield (0, user_service_1.loginUser)(mockPayload);
        expect(result.isSuccess).toBe(false);
        expect(models_1.User.findOne).toHaveBeenCalledWith({ email: mockPayload.email });
        expect((0, hash_manager_1.hashManager)().compare).not.toHaveBeenCalled();
        expect(response_format_1.formatResponse).toHaveBeenCalledWith({
            isSuccess: false,
            message: 'Email or Password is Invalid',
        });
        expect(login_util_service_1.generateLoginResponse).not.toHaveBeenCalled();
    }));
    it('should return an error response when an exception occurs', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPayload = {
            email: 'test@example.com',
            password: 'password',
        };
        models_1.User.findOne.mockRejectedValue(new Error('Test error'));
        response_format_1.formatResponse.mockReturnValue({ isSuccess: false, message: 'You just hit a break wall' });
        logger_1.default.error = jest.fn();
        const result = yield (0, user_service_1.loginUser)(mockPayload);
        expect(result.isSuccess).toBe(false);
        expect(models_1.User.findOne).toHaveBeenCalledWith({ email: mockPayload.email });
        expect((0, hash_manager_1.hashManager)().compare).not.toHaveBeenCalled();
        expect(logger_1.default.error).toHaveBeenCalledWith(expect.any(Error));
        expect(response_format_1.formatResponse).toHaveBeenCalledWith({
            isSuccess: false,
            message: 'You just hit a break wall',
        });
        expect(login_util_service_1.generateLoginResponse).not.toHaveBeenCalled();
    }));
});
//# sourceMappingURL=login.service.test.js.map