let log4js = require('log4js');

exports.getExpressLogger = getExpressLogger;
exports.getLogger = getLogger;

function getExpressLogger() {
    let logger = log4js.getLogger('ApiRequest');
    return log4js.connectLogger(logger, {level: 'debug'})
}

function getLogger(name) {
    const logger = log4js.getLogger(name);
    logger.level = 'debug';
    return logger;
}