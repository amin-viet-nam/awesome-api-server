const moment = require('moment');
const logger = require('./logger');
module.exports = (req, res, next) => {
    let responseTimeHandler = () => {

        if (req.requestTimestamp) {
            let responseTime = moment() - req.requestTimestamp;
            let url = req.originalUrl;
            logger.getLogger("REQUEST-TIME").debug('[DEBUG-REQUEST-TIME] : ' + url + ' - ' + responseTime + 'ms');
        }
    };

    res.on('finish', responseTimeHandler);
    res.on('close', responseTimeHandler);
    req.requestTimestamp = moment();
    next();
}