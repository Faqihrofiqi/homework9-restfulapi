const { appConfig } = require("../config");
const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  if (err.message) {
    const logs = {
      type: err.name,
      message: err.message,
      method: req.method,
      path: req.path,
      params: req.route.path,
      body: req.body,
      query: req.query,
      stack: err.stack,
    };
    logger.error(JSON.stringify(logs));
  }

  res.status(422).json({
    status: "failed",
    message: appConfig.IS_DEVELOPMENT ? err.message : "Something wrong!",
  });
}

module.exports = errorHandler;
