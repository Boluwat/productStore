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
exports.validatePathParams = exports.validateQueryAndBody = exports.validateQueryParams = exports.validateBodyParams = void 0;
const tokenizer_1 = require("../utils/tokenizer");
const validateBodyParams = (schema, isAuth = true) => (
// eslint-disable-next-line @typescript-eslint/ban-types
req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (isAuth) {
            const isAuthResponse = authenticate(req);
            if (!isAuthResponse.isSuccess) {
                return res.status(400).json(isAuthResponse);
            }
        }
        schema.parse(Object.assign({}, req.body));
        next();
    }
    catch (error) {
        return res.status(400).json({ isSuccess: false, data: error });
    }
});
exports.validateBodyParams = validateBodyParams;
const validateQueryParams = (schema, isAuth = true) => (
// eslint-disable-next-line @typescript-eslint/ban-types
req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (isAuth) {
            const isAuthResponse = authenticate(req);
            if (!isAuthResponse.isSuccess) {
                return res.status(400).json(isAuthResponse);
            }
        }
        schema.parse(req.query);
        next();
    }
    catch (error) {
        return res.status(400).json({ isSuccess: false, data: error });
    }
});
exports.validateQueryParams = validateQueryParams;
const validateQueryAndBody = (schema, isAuth = true) => (
// eslint-disable-next-line @typescript-eslint/ban-types
req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (isAuth) {
            const isAuthResponse = authenticate(req);
            if (!isAuthResponse.isSuccess) {
                return res.status(400).json(isAuthResponse);
            }
        }
        schema.query.parse(req.query);
        schema.body.parse(Object.assign({}, req.body));
        next();
    }
    catch (error) {
        return res.status(400).json({ isSuccess: false, data: error });
    }
});
exports.validateQueryAndBody = validateQueryAndBody;
const validatePathParams = (schema, isAuth = true) => (
// eslint-disable-next-line @typescript-eslint/ban-types
req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (isAuth) {
            const isAuthResponse = authenticate(req);
            if (!isAuthResponse.isSuccess) {
                return res.status(400).json(isAuthResponse);
            }
        }
        schema.parse(req.params);
        next();
    }
    catch (error) {
        return res.status(400).json({ isSuccess: false, data: error });
    }
});
exports.validatePathParams = validatePathParams;
const authenticate = (req) => {
    const authorizationHeader = req.headers["authorization"];
    const isAuthResponse = (0, tokenizer_1.verify)(authorizationHeader);
    if (isAuthResponse.isSuccess) {
        const userDetails = isAuthResponse.data;
        req.app.set("userDetails", userDetails);
    }
    return isAuthResponse;
};
//# sourceMappingURL=validate-.middleware.js.map