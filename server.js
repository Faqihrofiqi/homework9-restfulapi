const express = require("express");
const { appConfig } = require("./config");
const { morganMiddleware, errorHandler} = require("./middlewares");
const routes = require("./routes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = require("../docs/apiDocs.json");

function createServer() {
    const app = express();
    const specs = swaggerJSDoc(options);

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(morganMiddleware);
    app.use(`/${appConfig.API}`, routes);
    app.use(errorHandler);

    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(specs, { explorer: true})
      );

    return app;
}

module.exports = createServer;