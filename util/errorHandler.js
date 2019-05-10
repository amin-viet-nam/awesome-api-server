const logger = require('../util/logger').getLogger('RequestError', 'error');

const errorHandler = (opts = {}) => (err, req, res, next) => {
    console.log(err);
    if (opts.debug) {
        logger.error(JSON.stringify(err));
    }

    const statusCode = err.status || err.statusCode || 500;
    const message = !(err instanceof Error) ? 'Something went wrong, please try again laterr' : err.message;

    res.status(statusCode).json({
        code: err.name,
        message
    });

    return next();
};

module.exports = errorHandler;