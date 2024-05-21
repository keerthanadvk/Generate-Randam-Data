"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importDefault(require("winston"));
const path = require('path');
const transports = [
    new (require("winston-daily-rotate-file"))({
        zippedArchive: false,
        datePattern: 'YYYY-MM-DD-HH',
        maxFiles: '10',
        maxSize: '20m',
        filename: path.join(process.cwd(), 'logs', 'prospifi-dataparser.svc-info_%DATE%.txt'),
        level: 'info',
        format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'MM:DD:YYYY:HH:mm:ss' }), winston_1.default.format.json(), winston_1.default.format.printf((info) => ` ${info.level}: ${info.timestamp} ${info.message}`))
    }),
    new (require("winston-daily-rotate-file"))({
        zippedArchive: false,
        datePattern: 'YYYY-MM-DD-HH',
        maxFiles: '10',
        maxSize: '20m',
        filename: path.join(process.cwd(), 'logs', 'prospifi-dataparser.svc-error_%DATE%.txt'),
        level: 'error',
        format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'MM:DD:YYYY:HH:mm:ss' }), winston_1.default.format.json(), winston_1.default.format.printf(info => ` ${info.level}: ${info.timestamp} ${info.message}`))
    })
];
const Logger = winston_1.default.createLogger({
    transports
});
exports.default = Logger;
//# sourceMappingURL=logtrace.js.map