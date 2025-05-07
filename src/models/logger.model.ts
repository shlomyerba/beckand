import { v4 as uuidv4 } from 'uuid';

export interface ILogger {
    _id: string,
    service_name: string,
    date: number,
    level: number,
    message: string
}

export class Logger implements ILogger {
    _id: string;
    service_name: string;
    date: number;
    level: number;
    message: string;
    
    constructor(date: number, service_name: string, level: number, message: string) {
        this._id = uuidv4();
        this.service_name = service_name;
        this.date = date;
        this.level = level;
        this.message = message;
    }
}