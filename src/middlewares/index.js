const errorHandler = require("./errorHandlers.middlewares");
const morganMiddleware = require("./morgan.middlewares");
const validator = require("./validator");

module.exports = {
  errorHandler,
  morganMiddleware,
  validator,
};