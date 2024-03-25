"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = exports.routes = exports.userRoute = void 0;
const user_route_1 = __importDefault(require("./user.route"));
exports.userRoute = user_route_1.default;
const route_1 = __importDefault(require("./route"));
exports.routes = route_1.default;
const product_route_1 = __importDefault(require("./product.route"));
exports.productRoute = product_route_1.default;
//# sourceMappingURL=index.js.map