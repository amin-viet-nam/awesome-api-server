const log4js = require('log4js');

class Logger {
    getExpressLogger() {
        let logger = log4js.getLogger('ApiRequest');
        return log4js.connectLogger(logger, {level: 'debug'})
    }

    getLogger(name, level) {
        const logger = log4js.getLogger(name);
        logger.level = level || 'debug';
        return logger;
    }
};

module.exports = new Logger();