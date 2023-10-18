require("dotenv").config();

const appConfig = {
  PORT: parseInt(process.env.PORT) || 3000,
  API: process.env.API || "api/v1",
  IS_DEVELOPMENT: ["development", "dev", "local"].includes(process.env.SERVER),
  SECRET: "kotoamatsukami"
};

const dbConfig = {
  DB_HOST: process.env.DB_HOST,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: parseInt(process.env.DB_PORT) || 5432,
};

module.exports = {
  appConfig,
  dbConfig
};