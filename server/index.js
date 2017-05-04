const logger = require('./src/utilities/winston');
const startServer = require('./src/socketServer');

const conf = require('./src/config');
startServer();

logger.info(`Loaded conf for ${conf.envString} env. Server listening on port: ${conf.port}.`);
