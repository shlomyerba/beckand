import { env } from "process";

const DB_HOST = env.HOST || "localhost";
const DB_NAME = env.DB_NAME || 'dbName';
const DB_USER = env.DB_USER || 'root';
const DB_PASSWORD = env.DB_PASSWORD || '12345678';
const DB_PORT = env.DB_PORT || '3306';
const DB_DRIVER = env.DB_DRIVER || 'mysql';

const dbConfig = {
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    driver: DB_DRIVER
}

const config = {
    db: dbConfig
}

export default config;