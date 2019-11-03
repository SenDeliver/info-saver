const log = require('../singleton/logger');
const httpStatus = require('http-status');
const sendResponse = require('../singleton/sendResponse');

module.exports = (err, req, res, next) => {
    log.error(err);

    if (res.headersSent) {
        return next(err);
    }

    sendResponse(req, res, {
        httpCode: httpStatus.BAD_GATEWAY,
        data: {
            error: err.message
        }
    })
};