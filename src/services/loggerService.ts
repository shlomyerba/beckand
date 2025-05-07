import { env } from "process";

import { LoggerRepository } from "../db/dal/logger";

export class LoggerService {
    private loggerRepository: LoggerRepository;

    constructor() {
        this.loggerRepository = new LoggerRepository();
    }

    createLoogerRecord(level: number, message: string) {
        const service_name = <string>env.SERVIC_NAME;
        const date = new Date().getMilliseconds();
        this.loggerRepository.createLoggerRecord(date, service_name, level, message);
    }
}