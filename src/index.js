const createServer = require("./server");
const { appConfig } = require("./config");
const logger = require("./utils/logger");

function startServer() {
    const app = createServer();
    return app.listen(appConfig.PORT, async () => {
        try {
            logger.info(`Server is listening on port ${appConfig.PORT}`);
        } catch (error) {
            logger.error(`Cannot start server, error: ${err.message}`);
            process.exit(1);
        }
    })
}

startServer();