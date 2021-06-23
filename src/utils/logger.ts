/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from 'winston';
import util from 'util';

const combineMessageAndSplat = () => {
    return {
        transform: (info: any) => {
            info.message = util.format(info.message, ...info[Symbol.for('splat')] || [])
            return info;
        }
    }
}

const options = {
    console: {
        handleExceptions: true,
        level: 'debug',
        format: winston.format.combine(
            winston.format.colorize(),
            combineMessageAndSplat(),
            winston.format.splat(),
            winston.format.timestamp(),
            winston.format.prettyPrint(),
            winston.format.printf(
                (info) => `${info.level}: ${info.timestamp}: ${info.message}`
            ))
    },
    verbose: {
        format: winston.format.combine(combineMessageAndSplat(),
            winston.format.splat(),
            winston.format.timestamp(),
            winston.format.prettyPrint(),
            winston.format.printf(
                (info) => `${info.level}: ${info.timestamp}: ${info.message}`
            ))
    },
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File({
            filename: `${process.cwd()}/logs/error.log`, level: 'error', maxsize: 5242880, ...options.verbose
        }),
        new winston.transports.File({ filename: `${process.cwd()}/logs/app.log`, level: 'debug', maxsize: 10242880, ...options.verbose }),
    ],
});

export { logger };