const className = "CommonService";
import logger from "../../modules/utils/logtrace";
import path from 'path';
import { PROGRAM_FILE_NAME, CONFIG_FOLDER } from "../utils/constants";
const fs = require('fs');
const csvtojson = require('csvtojson');
import { parse } from 'json2csv';
export class CommonService {
    async readJSONFile(filePath: string) {
        const methodName = "readJSONFile";
        logger.info(`Class - ${className} method - ${methodName} Begin`);
        return new Promise<any>(resolve => {
            let jsonDataResult;
            try {
                if (filePath != undefined && filePath != '') {
                    if (fs.existsSync(filePath)) {
                        const fileName = path.basename(filePath);
                        //let fileWithOutExtention = fileName.split('.')[0];
                        const fileExtention = path.extname(fileName);

                        if (fileExtention.toLowerCase() == ".json") {
                            jsonDataResult = JSON.parse(fs.readFileSync(filePath));
                            //logger.info(`Class - ${className} :: method - ${methodName} jsonDataResult Data = \n ${JSON.stringify(jsonDataResult, null, "\t")}`);
                            resolve(jsonDataResult);
                        }
                    }
                    else {
                        logger.info(`Class - ${className} :: method - ${methodName} Invalid file Path - ${filePath}`);
                    }
                }
                else {
                    logger.info(`Class - ${className} :: method - ${methodName} json file path empty`);
                }
            }
            catch (err) {
                logger.error(`Error :: Class - ${className} method - ${methodName}`, err);
            }
            logger.info(`Class - ${className} method - ${methodName} End`);
        });
    }

    getProgramByProgramName(programs: any, programname: string) {
        const methodName = "getProgramByProgramName";
        logger.info(`Class - ${className} method - ${methodName} Begin`);
        try {
            if (programname) {
                programs = Array.isArray(programs) ? programs : [programs];
                if (programs.length > 0) {
                    return programs.find((program: any) => {
                        return program.programname.toLowerCase().trim() == programname.toLowerCase().trim();
                    });
                }
            }
            else
                return undefined;
        }
        catch (err) {
            logger.error(`Error :: Class - ${className} method - ${methodName}`, err);
        }
        logger.info(`Class - ${className} method - ${methodName} End`);
    }
    

    convertCsv2Json(csvfilePath: string) {
        const methodName = "convertCsv2Json";
        logger.info(`Class - ${className} method - ${methodName} Begin`);

        let jsonDataResult: any = [];
        try {
            if (csvfilePath != undefined && csvfilePath != '') {
                if (fs.existsSync(csvfilePath)) {
                    const fileName = path.basename(csvfilePath);
                    //let fileWithOutExtention = fileName.split('.')[0];
                    const fileExtention = path.extname(fileName);

                    if (fileExtention.toLowerCase() == ".csv") {
                        jsonDataResult = csvtojson().fromFile(csvfilePath);
                        //logger.info(`Class - ${className} :: method - ${methodName} jsonDataResult Data length = \n ${jsonDataResult.length}`);
                        //logger.info(`Class - ${className} :: method - ${methodName} jsonDataResult Data = \n ${JSON.stringify(jsonDataResult, null, "\t")}`);
                        return jsonDataResult;
                    }
                }
                else {
                    logger.info(`Class - ${className} :: method - ${methodName} No Such FIle Found -${csvfilePath}`);
                }
            }
            else {
                logger.info(`Class - ${className} :: method - ${methodName} csv file path empty`);
            }
        }
        catch (err) {
            logger.error(`Error :: Class - ${className} method - ${methodName}`, err);
        }
        logger.info(`Class - ${className} method - ${methodName} End`);
    }

    convertJsontoCsv(jsonData: string) {
        const methodName = "convertJsontoCsv";
        logger.info(`Class - ${className} method - ${methodName} Begin`);
        try {
            if (jsonData.length > 0) {
                const csvdata = parse(jsonData);
                return csvdata;
            }
            else {
                logger.info(`Class - ${className} :: method - ${methodName} json empty`);
            }
        }
        catch (err) {
            logger.error(`Error :: Class - ${className} method - ${methodName}`, err);
        }
        logger.info(`Class - ${className} method - ${methodName} End`);
        return undefined;
    }


    saveCSVFile(jsonData: string, filePath: string) {
        const methodName = "saveCSVFile";
        logger.info(`Class - ${className} method - ${methodName} Begin`);
        try {
            if (jsonData.length > 0) {

                const csvData = this.convertJsontoCsv(jsonData);
                fs.writeFileSync(filePath, csvData, 'utf8');
                return true;
            }
            else {
                logger.info(`Class - ${className} :: method - ${methodName} json empty`);
            }
        }
        catch (err) {
            logger.error(`Error :: Class - ${className} method - ${methodName}`, err);

        }
        logger.info(`Class - ${className} method - ${methodName} End`);
        return false;
    }


    async getPrograms() {
        return await this.readJSONFile(path.join(CONFIG_FOLDER, PROGRAM_FILE_NAME));
    }

    async getFilesFromDirectory(directoryPath: string) {
        const methodName = "getFilesFromDirectory";
        logger.info(`Class - ${className} method - ${methodName} Begin`);
        try {
            if (!fs.existsSync(directoryPath)) {
                logger.info(`Class - ${className} method - ${methodName} directory not exist`);
                return [];
            }
            let files = fs.readdirSync(directoryPath);
            files = files.map((fileName: string) => {
                return path.join(directoryPath, fileName)
            });
            return [].concat(files);

        }
        catch (err) {
            logger.error(`Error :: Class - ${className} method - ${methodName}`, err);
        }
        logger.info(`Class - ${className} method - ${methodName} End`);
        return [];
    }

}