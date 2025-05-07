import { env } from "process"
import winston from "winston";

const levels = {
    error: 0 ,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    https: 'magenta',
    debug: 'white'
}

const level = () => {
    return (env.NODE_ENV || 'development') === 'development' ? 'debug' : 'warn';
}

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${env.SERVICE_NAME} ${info.level}: ${info.message}`
    )
);

const transports =[
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error'
    }),
    new winston.transports.File({ filename: 'logs/all.log' })
];

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports
});

export default Logger;