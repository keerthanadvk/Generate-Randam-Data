"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonService = void 0;
const tslib_1 = require("tslib");
const className = "CommonService";
const logtrace_1 = tslib_1.__importDefault(require("../../modules/utils/logtrace"));
const path_1 = tslib_1.__importDefault(require("path"));
const constants_1 = require("../utils/constants");
const fs = require('fs');
const csvtojson = require('csvtojson');
const json2csv_1 = require("json2csv");
class CommonService {
    readJSONFile(filePath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const methodName = "readJSONFile";
            logtrace_1.default.info(`Class - ${className} method - ${methodName} Begin`);
            return new Promise(resolve => {
                let jsonDataResult;
                try {
                    if (filePath != undefined && filePath != '') {
                        if (fs.existsSync(filePath)) {
                            const fileName = path_1.default.basename(filePath);
                            const fileExtention = path_1.default.extname(fileName);
                            if (fileExtention.toLowerCase() == ".json") {
                                jsonDataResult = JSON.parse(fs.readFileSync(filePath));
                                resolve(jsonDataResult);
                            }
                        }
                        else {
                            logtrace_1.default.info(`Class - ${className} :: method - ${methodName} Invalid file Path - ${filePath}`);
                        }
                    }
                    else {
                        logtrace_1.default.info(`Class - ${className} :: method - ${methodName} json file path empty`);
                    }
                }
                catch (err) {
                    logtrace_1.default.error(`Error :: Class - ${className} method - ${methodName}`, err);
                }
                logtrace_1.default.info(`Class - ${className} method - ${methodName} End`);
            });
        });
    }
    getProgramByProgramName(programs, programname) {
        const methodName = "getProgramByProgramName";
        logtrace_1.default.info(`Class - ${className} method - ${methodName} Begin`);
        try {
            if (programname) {
                programs = Array.isArray(programs) ? programs : [programs];
                if (programs.length > 0) {
                    return programs.find((program) => {
                        return program.programname.toLowerCase().trim() == programname.toLowerCase().trim();
                    });
                }
            }
            else
                return undefined;
        }
        catch (err) {
            logtrace_1.default.error(`Error :: Class - ${className} method - ${methodName}`, err);
        }
        logtrace_1.default.info(`Class - ${className} method - ${methodName} End`);
    }
    convertCsv2Json(csvfilePath) {
        const methodName = "convertCsv2Json";
        logtrace_1.default.info(`Class - ${className} method - ${methodName} Begin`);
        let jsonDataResult = [];
        try {
            if (csvfilePath != undefined && csvfilePath != '') {
                if (fs.existsSync(csvfilePath)) {
                    const fileName = path_1.default.basename(csvfilePath);
                    const fileExtention = path_1.default.extname(fileName);
                    if (fileExtention.toLowerCase() == ".csv") {
                        jsonDataResult = csvtojson().fromFile(csvfilePath);
                        return jsonDataResult;
                    }
                }
                else {
                    logtrace_1.default.info(`Class - ${className} :: method - ${methodName} No Such FIle Found -${csvfilePath}`);
                }
            }
            else {
                logtrace_1.default.info(`Class - ${className} :: method - ${methodName} csv file path empty`);
            }
        }
        catch (err) {
            logtrace_1.default.error(`Error :: Class - ${className} method - ${methodName}`, err);
        }
        logtrace_1.default.info(`Class - ${className} method - ${methodName} End`);
    }
    convertJsontoCsv(jsonData) {
        const methodName = "convertJsontoCsv";
        logtrace_1.default.info(`Class - ${className} method - ${methodName} Begin`);
        try {
            if (jsonData.length > 0) {
                const csvdata = (0, json2csv_1.parse)(jsonData);
                return csvdata;
            }
            else {
                logtrace_1.default.info(`Class - ${className} :: method - ${methodName} json empty`);
            }
        }
        catch (err) {
            logtrace_1.default.error(`Error :: Class - ${className} method - ${methodName}`, err);
        }
        logtrace_1.default.info(`Class - ${className} method - ${methodName} End`);
        return undefined;
    }
    saveCSVFile(jsonData, filePath) {
        const methodName = "saveCSVFile";
        logtrace_1.default.info(`Class - ${className} method - ${methodName} Begin`);
        try {
            if (jsonData.length > 0) {
                const csvData = this.convertJsontoCsv(jsonData);
                fs.writeFileSync(filePath, csvData, 'utf8');
                return true;
            }
            else {
                logtrace_1.default.info(`Class - ${className} :: method - ${methodName} json empty`);
            }
        }
        catch (err) {
            logtrace_1.default.error(`Error :: Class - ${className} method - ${methodName}`, err);
        }
        logtrace_1.default.info(`Class - ${className} method - ${methodName} End`);
        return false;
    }
    getPrograms() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.readJSONFile(path_1.default.join(constants_1.CONFIG_FOLDER, constants_1.PROGRAM_FILE_NAME));
        });
    }
    getFilesFromDirectory(directoryPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const methodName = "getFilesFromDirectory";
            logtrace_1.default.info(`Class - ${className} method - ${methodName} Begin`);
            try {
                if (!fs.existsSync(directoryPath)) {
                    logtrace_1.default.info(`Class - ${className} method - ${methodName} directory not exist`);
                    return [];
                }
                let files = fs.readdirSync(directoryPath);
                files = files.map((fileName) => {
                    return path_1.default.join(directoryPath, fileName);
                });
                return [].concat(files);
            }
            catch (err) {
                logtrace_1.default.error(`Error :: Class - ${className} method - ${methodName}`, err);
            }
            logtrace_1.default.info(`Class - ${className} method - ${methodName} End`);
            return [];
        });
    }
}
exports.CommonService = CommonService;
//# sourceMappingURL=common-service.js.map