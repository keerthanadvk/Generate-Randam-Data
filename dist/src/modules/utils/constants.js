"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROGRAM_FILE_NAME = exports.EMAIL_TEMPLATES_FOLDER = exports.CONFIG_FOLDER = exports.ROOT_FOLDER = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const process_1 = require("process");
exports.ROOT_FOLDER = process.cwd();
exports.CONFIG_FOLDER = path_1.default.join(exports.ROOT_FOLDER, "config");
exports.EMAIL_TEMPLATES_FOLDER = path_1.default.join(exports.ROOT_FOLDER, "email-templates");
exports.PROGRAM_FILE_NAME = process_1.env.PROGRAM_FILE_NAME || "programs.json";
//# sourceMappingURL=constants.js.map