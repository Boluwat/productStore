"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserStoreModelToDTO = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapUserStoreModelToDTO = (user) => ({
    id: user._id.toString(),
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    mobile: user.mobile,
    createdAt: user === null || user === void 0 ? void 0 : user.createdAt,
    updatedAt: user === null || user === void 0 ? void 0 : user.updatedAt,
});
exports.mapUserStoreModelToDTO = mapUserStoreModelToDTO;
//# sourceMappingURL=util.js.map