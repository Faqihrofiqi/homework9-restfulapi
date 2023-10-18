const Pool = require("pg").Pool
const { dbConfig } = require("../config");
const pool = new Pool(
    {
        user: `${dbConfig.DB_USERNAME}`,
        host: `${dbConfig.DB_HOST}`,
        database: `${dbConfig.DB_DATABASE}`,
        password: `${dbConfig.DB_PASSWORD}`,
        port: `${dbConfig.DB_PORT}`,
    }
)

module.exports = pool;