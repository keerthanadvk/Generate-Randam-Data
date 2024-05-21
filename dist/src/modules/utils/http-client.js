"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const request = tslib_1.__importStar(require("request"));
const util_1 = require("util");
const promisifiedRequest = {
    get: (0, util_1.promisify)(request.get),
    put: (0, util_1.promisify)(request.put),
    post: (0, util_1.promisify)(request.post),
    patch: (0, util_1.promisify)(request.patch),
    delete: (0, util_1.promisify)(request.delete)
};
exports.default = promisifiedRequest;
//# sourceMappingURL=http-client.js.map