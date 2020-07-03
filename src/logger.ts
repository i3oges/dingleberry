import winston from 'winston';

export const log = winston.createLogger({ format: winston.format.json(), transports: [new winston.transports.Console()] });
