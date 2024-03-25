"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const _2 = require(".");
exports.default = (app) => {
    app.use("/api", _1.userRoute);
    app.use("/api", _2.productRoute);
};
//# sourceMappingURL=route.js.map