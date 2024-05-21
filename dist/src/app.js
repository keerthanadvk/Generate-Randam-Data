"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const env_1 = tslib_1.__importDefault(require("./../config/env"));
const express_1 = tslib_1.__importDefault(require("express"));
const app = (0, express_1.default)();
const port = env_1.default.PORT || 4200;
const logtrace_1 = tslib_1.__importDefault(require("../src/modules/utils/logtrace"));
const className = "app.ts";
const GenerateTestDataProcess_1 = require("./api/testFileGeneration/GenerateTestDataProcess");
app.listen(port, () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const methodName = "listen";
    try {
        logtrace_1.default.info(`Class - ${className} method - ${methodName} Begin`);
        logtrace_1.default.info(`Class - ${className} method - ${methodName} Express is listening at http://localhost:${port}`);
        const generateTestDataProcess = new GenerateTestDataProcess_1.GenerateTestDataProcess();
        generateTestDataProcess.buildTestData();
        logtrace_1.default.info(`Class - ${className} method - ${methodName} End`);
        return console.log(`Express is listening at http://localhost:${port}`);
    }
    catch (err) {
        logtrace_1.default.error(`Error :: Class - ${className} method - ${methodName}`, err);
    }
}));
app.get('/', (_req, res) => {
    res.send('prospifi-dataparser.svc!');
});
//# sourceMappingURL=app.js.map