import env from "./../config/env";
import express from 'express';
const app = express();
const port = env.PORT || 4200;
import logger from "../src/modules/utils/logtrace";

const className = "app.ts";

import {GenerateTestDataProcess} from "./api/testFileGeneration/GenerateTestDataProcess"

app.listen(port, async () => {
    const methodName = "listen";
    try {
        logger.info(`Class - ${className} method - ${methodName} Begin`);
        logger.info(`Class - ${className} method - ${methodName} Express is listening at http://localhost:${port}`);

        const generateTestDataProcess=new GenerateTestDataProcess();
        generateTestDataProcess.buildTestData();
        
        logger.info(`Class - ${className} method - ${methodName} End`);
        return console.log(`Express is listening at http://localhost:${port}`);
    }
    catch (err) {
        logger.error(`Error :: Class - ${className} method - ${methodName}`, err);
    }

});


app.get('/', (_req, res) => {
    res.send('prospifi-dataparser.svc!');
});

