import logger from "../../modules/utils/logtrace";
import { CommonService } from "../../modules/services/common-service";
import path from "path";
import fs from "fs";

const className = "GenerateTestDataProcess";
const _cmnService = new CommonService();

export class GenerateTestDataProcess {
    private dataFilePath: string;
    private inputFolder: string;
    private schemaConfigFilePath: string;
    private schemaFolder: string;

    public async buildTestData(): Promise<void> {
        const methodName = "buildTestData";
        logger.info(`Class - ${className} method - ${methodName} Begin`);

        try {
            const program = await _cmnService.getPrograms();
            if (program) {
                await this.processFile(program);
            } else {
                logger.info(`Class - ${className} method - ${methodName} - program ${program} not found`);
            }
        } catch (err) {
            logger.error(`Error :: Class - ${className} method - ${methodName}`, err);
        }

        logger.info(`Class - ${className} method - ${methodName} End`);
    }

    async processFile(program:any) {
        const methodName = "processFile";
        logger.info(`Class - ${className} method - ${methodName} Begin`);

        try {
            if (!program) {
                logger.info(`Class - ${className} method - ${methodName} Skip the Process, program not found!`);
                return;
            }

            this.inputFolder = path.join(process.cwd(), program.inputFolder);
            this.schemaFolder = path.join(process.cwd(), program.schemaFolder);

            this.schemaConfigFilePath = path.join(this.schemaFolder, program.schemaConfigFile);
            const lstSchemaFields = await _cmnService.readJSONFile(this.schemaConfigFilePath);
            this.dataFilePath = path.join(this.inputFolder,program.fileName)

            if (lstSchemaFields.schemaconfig.fileType == "txt" && lstSchemaFields.schemaconfig.isIndexed) {
                const parsefilePath = path.join(process.cwd(), program.outputFolder, "parsefilePath.csv");
                const newDataFilePath = await this.txtFileToCSVFile(this.dataFilePath, parsefilePath, lstSchemaFields.schemaconfig.fields);
                console.log(newDataFilePath);
                await this.processCsvFiles(newDataFilePath, program, lstSchemaFields.schemaconfig)
    
            } else {
                await this.processCsvFiles(this.dataFilePath, program, lstSchemaFields.schemaconfig)
            }
        } catch (err) {
            logger.error(`Error :: Class - ${className} method - ${methodName}`, err);
        }

        logger.info(`Class - ${className} method - ${methodName} End`);
    }

    

    async processCsvFiles(dataFilePath: string, program: any, schema: any): Promise<void> {
        const methodName = "processIndexFiles";
        logger.info(`Class - ${className} method - ${methodName} Begin`);
    
        try {
            const filePath = path.join(process.cwd(), program.inputFolder, program.fileName);
            const fileWithoutExtension = path.basename(filePath, path.extname(filePath));
            const destinationpath = path.join(process.cwd(), program.outputFolder, fileWithoutExtension + "_updatedRandomText.csv");
            const records = await _cmnService.convertCsv2Json(dataFilePath);
            const totalData: string[] = [];
            const headers = Object.keys(records[0]).join(',');
            totalData.push(headers);
    
            records.forEach((item: any) => {
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
            fs.writeFileSync(destinationpath, csvString, 'utf8');
    
        } catch (error) {
            logger.error(`Error processing files: ${error.message}`);
        }
    
        logger.info(`Class - ${className} method - ${methodName} End`);
    }
    
    processRecord(record: any, schema: any): any[] {
        const methodName = "processRecord";
        logger.info(`Class - ${className} method - ${methodName} Begin`);
    
        schema.fields.forEach(async (field: any) => {
            
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
            if(field.formatPhoneNumber){
                record[field.name] =  this.FormatPhoneNumber(record[field.name]);
            }        
            
        });
    
        logger.info(`Class - ${className} method - ${methodName} End`);
        return record;
    }
    
     FormatPhoneNumber(phoneNumber: any) {
        try {
            phoneNumber =  this.removeAllNonNumericCharacters(phoneNumber);
            console.log(phoneNumber);
            phoneNumber = phoneNumber.toString();
            const formattedPhNum = phoneNumber.length >= 10 ?  this.formatToPhone(phoneNumber) : phoneNumber;
            console.log(formattedPhNum);
            return formattedPhNum;
        } catch (error) {
            throw error;
        }
    }
    
     removeAllNonNumericCharacters(phoneNumber: string) {
        try {
            return phoneNumber.replace(/\D/g, '');
        } catch (error) {
            throw error;
        }
    }
    
     formatToPhone(phoneNumber: any) {
        try {
            phoneNumber = phoneNumber.toString();
            if (phoneNumber.length === 10)
                return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6, 10)}`;
            else if (phoneNumber.length === 11)
                return `${phoneNumber.substring(0, 1)}-(${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(4, 7)}-${phoneNumber.substring(7, 11)}`;
            console.log(phoneNumber);
        } catch (error) {
            throw error;
        }
        return null;
    }
    

    GenerateTestData(field: string): string {
        const methodName = "GenerateTestData";
        logger.info(`Class - ${className} method - ${methodName} Begin`);
        
        let output: string = '';
        const wordChars: string[] = field.split('');
        const allowedChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < wordChars.length; i++) {
            output += wordChars[i] === " " ? " " : allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
        }

        logger.info(`Class - ${className} method - ${methodName} End`);
        return output;
    }

    GenerateTestNumber(field: string): string {
        const methodName = "GenerateTestNumber";
        logger.info(`Class - ${className} method - ${methodName} Begin`);
        
        let output: string = '';
        const wordChars: string[] = field.split('');
        const allowedChars: string = "0123456789";
        for (let i = 0; i < wordChars.length; i++) {
            output += (wordChars[i] === " " || wordChars[i] === "-") ? wordChars[i] : allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
        }

        logger.info(`Class - ${className} method - ${methodName} End`);
        return output;
    }


    async txtFileToCSVFile(filePath: string, parsefilePath: string, schemaFields: any) {
        const methodName = "prospifi_TxtFileToCSVFile";
        logger.info(`Class - ${className} method - ${methodName} Begin`);
        logger.info(`Class - ${className} method - ${methodName} filePath -  ${filePath}`);
        logger.info(`Class - ${className} method - ${methodName} parsefilePath -  ${parsefilePath}`);
        logger.info(`Class - ${className} method - ${methodName} schemaFields count -  ${schemaFields.length}`);
        try {
            const emptySpcReg = /^\s*$/;
            
            if (schemaFields.length > 0) {
                if (fs.existsSync(filePath)) {
                    const jsonData: any = [];
                    const fileContent = await fs.promises.readFile(filePath, "utf-8");
                    const lineDataArray = fileContent.split("\n");


                    for (let i = 0; i < lineDataArray.length; i++) {
                        const lineData = lineDataArray[i];
                        const row: any = {};
                        for (const field of schemaFields) {
                            const { name, startPosition, endPosition } = field;
                            const result = lineData.substring(startPosition - 1, endPosition).trim();
                            row[name] = emptySpcReg.test(result)?'':result.trim();
                        }

                        jsonData.push(row);
                    }


                    if (jsonData.length > 0) {
                        const result = await _cmnService.saveCSVFile(jsonData, parsefilePath);

                        if (result === true)
                            //fs.unlinkSync(filePath);

                        return parsefilePath;
                    }
                }
                else
                logger.info(`Class - ${className} method - ${methodName} no such file found - ${filePath}`);
            }
            else
            logger.info(`Class - ${className} method - ${methodName} schema fields empty`);
        }
        catch (err) {
            logger.error(`Error :: Class - ${className} method - ${methodName}`, err);
        }
        logger.info(`Class - ${className} method - ${methodName} End`);
        return undefined;

    }
}
