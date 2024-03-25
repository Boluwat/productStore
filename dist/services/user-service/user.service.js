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
exports.loginUser = exports.createUser = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const models_1 = require("../../models");
const response_format_1 = require("../../utils/response-format");
const hash_manager_1 = require("../../utils/hash-manager");
const util_1 = require("./util");
const login_util_service_1 = require("./login-util.service");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = payload;
        const user = yield models_1.User.findOne({ email });
        if (user) {
            return (0, response_format_1.formatResponse)({
                isSuccess: false,
                message: "User does not exist",
            });
        }
        payload.password = yield (0, hash_manager_1.hashManager)().hash(password);
        const newUser = yield models_1.User.create(payload);
        return (0, response_format_1.formatResponse)({
            isSuccess: true,
            data: (0, util_1.mapUserStoreModelToDTO)(newUser),
            message: "User register succesfully",
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
exports.createUser = createUser;
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = payload;
        const user = yield models_1.User.findOne({ email });
        if (user) {
            const validate = yield (0, hash_manager_1.hashManager)().compare(password, user.password);
            if (validate) {
                const data = (0, login_util_service_1.generateLoginResponse)((0, util_1.mapUserStoreModelToDTO)(user));
                return (0, response_format_1.formatResponse)({
                    isSuccess: true,
                    data
                });
            }
        }
        return (0, response_format_1.formatResponse)({
            isSuccess: false,
            message: 'Email or Password is Invalid'
        });
    }
    catch (err) {
        logger_1.default.error(err);
        return (0, response_format_1.formatResponse)({
            isSuccess: false,
            message: 'You just hit a break wall'
        });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=user.service.js.map