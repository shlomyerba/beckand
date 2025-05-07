import { Dialect, Sequelize } from "sequelize";
import config from "./config";

const params = {
    host: config.db.host,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password,
    db_driver: config.db.driver as Dialect
}

const dbConnection = new Sequelize(params.database, params.user, params.password, {
    host: params.host,
    dialect: params.db_driver
});

export default dbConnection;