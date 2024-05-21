import winston from 'winston'
const path = require('path');
const transports = [
    new (require("winston-daily-rotate-file"))({
        zippedArchive: false,
        datePattern: 'YYYY-MM-DD-HH',
        maxFiles: '10',
        maxSize: '20m',
        filename: path.join(process.cwd(), 'logs', 'prospifi-dataparser.svc-info_%DATE%.txt'),
        level: 'info',            
        format: winston.format.combine(
            winston.format.timestamp({format:'MM:DD:YYYY:HH:mm:ss'}),
            winston.format.json(),
            winston.format.printf((info) => ` ${info.level}: ${info.timestamp} ${info.message}`)
        )
    }), 
    new (require("winston-daily-rotate-file"))({
        zippedArchive: false,
        datePattern: 'YYYY-MM-DD-HH',
        maxFiles: '10',
        maxSize: '20m',
        filename: path.join(process.cwd(), 'logs', 'prospifi-dataparser.svc-error_%DATE%.txt'),
        level: 'error',            
        format: winston.format.combine(
            winston.format.timestamp({format:'MM:DD:YYYY:HH:mm:ss'}),
            winston.format.json(),
            winston.format.printf(info => ` ${info.level}: ${info.timestamp} ${info.message}`)
        )
    })
]

const Logger = winston.createLogger({
  transports
})

export default Logger