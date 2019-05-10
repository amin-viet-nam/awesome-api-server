const serviceProvider = require('./_serviceFactory');

module.exports = (req, res, next) => {
    req.service = serviceProvider('awesome');
    next();
};