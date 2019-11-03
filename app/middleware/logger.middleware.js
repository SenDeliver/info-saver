const log = require('../singleton/logger');

module.exports = (req, res, next) => {
    log.info(`<<<<=== %s : %s, %j`, req.method, req.originalUrl, req.body);

    next();
};