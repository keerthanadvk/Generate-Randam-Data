"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateTestDataProcess = void 0;
const tslib_1 = require("tslib");
const logtrace_1 = tslib_1.__importDefault(require("../../modules/utils/logtrace"));
const common_service_1 = require("../../modules/services/common-service");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const className = "GenerateTestDataProcess";
const _cmnService = new common_service_1.CommonService();
class GenerateTestDataProcess {
    buildTestData() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const methodName = "buildTestData";
            logtrace_1.default.info(`Class - ${className} method - ${methodName} Begin`);
            try {
                const program = yield _cmnService.getPrograms();
                if (program) {
                    yield this.processFile(program);
                }
                else {
                    logtrace_1.default.info(`Class - ${className} method - ${methodName} - program ${program} not found`);
                }
            }
            catch (err) {
                logtrace_1.default.error(`Error :: Class - ${className} method - ${methodName}`, err);
            }
            logtrace_1.default.info(`Class - ${className} method - ${methodName} End`);
        });
    }
    processFile(program) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const methodName = "processFile";
            logtrace_1.default.info(`Class - ${className} method - ${methodName} Begin`);
            try {
                if (!program) {
                    logtrace_1.default.info(`Class - ${className} method - ${methodName} Skip the Process, program not found!`);
                    return;
                }
                this.inputFolder = path_1.default.join(process.cwd(), program.inputFolder);
                this.schemaFolder = path_1.default.join(process.cwd(), program.schemaFolder);
                this.schemaConfigFilePath = path_1.default.join(this.schemaFolder, program.schemaConfigFile);
                const lstSchemaFields = yield _cmnService.readJSONFile(this.schemaConfigFilePath);
                this.dataFilePath = path_1.default.join(this.inputFolder, program.fileName);
                if (lstSchemaFields.schemaconfig.fileType == "txt" && lstSchemaFields.schemaconfig.isIndexed) {
                    const parsefilePath = path_1.default.join(process.cwd(), program.outputFolder, "parsefilePath.csv");
                    const newDataFilePath = yield this.txtFileToCSVFile(this.dataFilePath, parsefilePath, lstSchemaFields.schemaconfig.fields);
                    console.log(newDataFilePath);
                    yield this.processCsvFiles(newDataFilePath, program, lstSchemaFields.schemaconfig);
                }
                else {
                    yield this.processCsvFiles(this.dataFilePath, program, lstSchemaFields.schemaconfig);
                }
            }
            catch (err) {
                logtrace_1.default.error(`Error :: Class - ${className} method - ${methodName}`, err);
            }
            logtrace_1.default.info(`Class - ${className} method - ${methodName} End`);
        });
    }
    processCsvFiles(dataFilePath, program, schema) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const methodName = "processIndexFiles";
            logtrace_1.default.info(`Class - ${className} method - ${methodName} Begin`);
            try {
                const filePath = path_1.default.join(process.cwd(), program.inputFolder, program.fileName);
                const fileWithoutExtension = path_1.default.basename(filePath, path_1.default.extname(filePath));
                const destinationpath = path_1.default.join(process.cwd(), program.outputFolder, fileWithoutExtension + "_updatedRandomText.csv");
                const records = yield _cmnService.convertCsv2Json(dataFilePath);
                const totalData = [];
                const headers = Object.keys(records[0]).join(',');
                totalData.push(headers);
                records.forEach((item) => {
                    const record = this.processRecord(item, schema);
                    const values = Object.values(record).map(value => {
                        if (typeof value === 'string' && value.includes(',')) {
                            return `"${value}"`;
                        }
                        return value;
                    }).join(',');
                    totalData.push(values);
                });
                const csvString = totalData.join('\n');
                fs_1.default.writeFileSync(destinationpath, csvString, 'utf8');
                console.log("updated randam data");
            }
            catch (error) {
                logtrace_1.default.error(`Error processing files: ${error.message}`);
            }
            logtrace_1.default.info(`Class - ${className} method - ${methodName} End`);
        });
    }
    processRecord(record, schema) {
        const methodName = "processRecord";
        logtrace_1.default.info(`Class - ${className} method - ${methodName} Begin`);
        schema.fields.forEach((field) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (field.isGenerateRandomText) {
                switch (field.type) {
                    case "number":
                        record[field.name] = this.GenerateTestNumber(record[field.name]);
                        break;
                    default:
                        record[field.name] = this.GenerateTestData(record[field.name]);
                        break;
                }
            }
            if (field.formatPhoneNumber) {
                record[field.name] = this.FormatPhoneNumber(record[field.name]);
            }
        }));
        logtrace_1.default.info(`Class - ${className} method - ${methodName} End`);
        return record;
    }
    FormatPhoneNumber(phoneNumber) {
        try {
            phoneNumber = this.removeAllNonNumericCharacters(phoneNumber);
            console.log(phoneNumber);
            phoneNumber = phoneNumber.toString();
            const formattedPhNum = phoneNumber.length >= 10 ? this.formatToPhone(phoneNumber) : phoneNumber;
            console.log(formattedPhNum);
            return formattedPhNum;
        }
        catch (error) {
            throw error;
        }
    }
    removeAllNonNumericCharacters(phoneNumber) {
        try {
            return phoneNumber.replace(/\D/g, '');
        }
        catch (error) {
            throw error;
        }
    }
    formatToPhone(phoneNumber) {
        try {
            phoneNumber = phoneNumber.toString();
            if (phoneNumber.length === 10)
                return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6, 10)}`;
            else if (phoneNumber.length === 11)
                return `${phoneNumber.substring(0, 1)}-(${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(4, 7)}-${phoneNumber.substring(7, 11)}`;
            console.log(phoneNumber);
        }
        catch (error) {
            throw error;
        }
        return null;
    }
    GenerateTestData(field) {
        const methodName = "GenerateTestData";
        logtrace_1.default.info(`Class - ${className} method - ${methodName} Begin`);
        let output = '';
        const wordChars = field.split('');
        const allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < wordChars.length; i++) {
            output += wordChars[i] === " " ? " " : allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
        }
        logtrace_1.default.info(`Class - ${className} method - ${methodName} End`);
        return output;
    }
    GenerateTestNumber(field) {
        const methodName = "GenerateTestNumber";
        logtrace_1.default.info(`Class - ${className} method - ${methodName} Begin`);
        let output = '';
        const wordChars = field.split('');
        const allowedChars = "0123456789";
        for (let i = 0; i < wordChars.length; i++) {
            output += (wordChars[i] === " " || wordChars[i] === "-") ? wordChars[i] : allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
        }
        logtrace_1.default.info(`Class - ${className} method - ${methodName} End`);
        return output;
    }
    txtFileToCSVFile(filePath, parsefilePath, schemaFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const methodName = "prospifi_TxtFileToCSVFile";
            logtrace_1.default.info(`Class - ${className} method - ${methodName} Begin`);
            logtrace_1.default.info(`Class - ${className} method - ${methodName} filePath -  ${filePath}`);
            logtrace_1.default.info(`Class - ${className} method - ${methodName} parsefilePath -  ${parsefilePath}`);
            logtrace_1.default.info(`Class - ${className} method - ${methodName} schemaFields count -  ${schemaFields.length}`);
            try {
                const emptySpcReg = /^\s*$/;
                if (schemaFields.length > 0) {
                    if (fs_1.default.existsSync(filePath)) {
                        const jsonData = [];
                        const fileContent = yield fs_1.default.promises.readFile(filePath, "utf-8");
                        const lineDataArray = fileContent.split("\n");
                        for (let i = 0; i < lineDataArray.length; i++) {
                            const lineData = lineDataArray[i];
                            const row = {};
                            for (const field of schemaFields) {
                                const { name, startPosition, endPosition } = field;
                                const result = lineData.substring(startPosition - 1, endPosition).trim();
                                row[name] = emptySpcReg.test(result) ? '' : result.trim();
                            }
                            jsonData.push(row);
                        }
                        if (jsonData.length > 0) {
                            const result = yield _cmnService.saveCSVFile(jsonData, parsefilePath);
                            if (result === true)
                                return parsefilePath;
                        }
                    }
                    else
                        logtrace_1.default.info(`Class - ${className} method - ${methodName} no such file found - ${filePath}`);
                }
                else
                    logtrace_1.default.info(`Class - ${className} method - ${methodName} schema fields empty`);
            }
            catch (err) {
                logtrace_1.default.error(`Error :: Class - ${className} method - ${methodName}`, err);
            }
            logtrace_1.default.info(`Class - ${className} method - ${methodName} End`);
            return undefined;
        });
    }
}
exports.GenerateTestDataProcess = GenerateTestDataProcess;
//# sourceMappingURL=GenerateTestDataProcess.js.map