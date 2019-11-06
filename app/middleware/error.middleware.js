const log = require('../singleton/logger');
const httpStatus = require('http-status');
const sendResponse = require('../singleton/sendResponse');
const {HttpError} = require('../utils/helper');

module.exports = (err, req, res, next) => {
    log.error(err);

    let httpCode = httpStatus.INTERNAL_SERVER_ERROR;
    let data = {};

    if (err instanceof HttpError) {
        httpCode = err.httpCode;
        data = { error: err.message }
    } else {
        data = { error: err.message }
    }

    sendResponse(req, res, {
        httpCode,
        data
    })
};