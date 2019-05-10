const moment = require('moment');
const logger = require('./logger');
const requestTimerLogger = logger.getLogger("REQUEST-TIME");

module.exports = (req, res, next) => {
    let responseTimeHandler = (e) => {
        if (req.requestTimestamp) {
            const responseTime = moment() - req.requestTimestamp;
            const url = req.originalUrl;
            requestTimerLogger.debug(`${url} - ${responseTime}ms`);
        }
    };

    res.on('close', responseTimeHandler);
    req.requestTimestamp = moment();
    next();
}