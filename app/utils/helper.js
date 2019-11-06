const sendResponse = require('../singleton/sendResponse');

class HttpError extends Error{
    constructor({httpCode, errorMessage}) {
        super(errorMessage);

        this.name = this.constructor.name;
        this.httpCode = httpCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

const formatError = ({httpCode, errorMessage}) => {
    throw new HttpError({httpCode, errorMessage});
};

module.exports = {
    formatError,
    HttpError
};