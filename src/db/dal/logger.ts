import { Logger } from "../../models/logger.model";

export class LoggerRepository {
  createLoggerRecord(
    date: number,
    service_name: string,
    level: number,
    message: string
  ) {
    const logger_record = new Logger(date, service_name, level, message);
    //TODO: Save to the log table on the DB.
    console.log(
      `${logger_record.date} - ${logger_record.service_name} - ${logger_record.level} - ${logger_record.message}`
    );
  }
}
