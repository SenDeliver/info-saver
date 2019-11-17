const R = require('ramda');
const httpStatus = require('http-status-codes');
const uuidv4 = require('uuid/v4');
const db = require('../../services/DBService');
const log = require('../../singleton/logger');
const {USER_FRIENDLY_DB_ERROR} = require("../../constants");
const {formatError} = require('../../utils/helper');

class PageBase {
    constructor() {
        this.eid = null;
        this.data = null;
        this.access_token = null;
    };

    validate(data) {
        log.debug('Start validate data %j', data);

        if (R.isEmpty(data)) formatError({
            httpCode: httpStatus.BAD_REQUEST,
            errorMessage: 'Invalid data'
        });

        this.data = data;

        return true;
    }

    _makeUniqueKey() {
        return uuidv4();
    }

    async _checkAbleToModify() {
        log.info('Check able to modify for eid: %s, token: %s', this.eid, this.access_token);

        const page = await db.getPage(this.eid);

        if (page.length < 1) formatError({
            httpCode: httpStatus.NOT_FOUND,
            errorMessage: 'Page not found'
        });

        const accessToken = R.pathOr(null, ['0', 'access_token'], page);

        if (Boolean(accessToken) && accessToken !== this.access_token) formatError({
            httpCode: httpStatus.FORBIDDEN,
            errorMessage: 'Forbidden operation'
        });
    }

    async _DBQueryHandler(fn) {
        try {
            return await fn();
        } catch (e) {
            log.error('Error from DB: %s, all details: %j', e.message, e);

            if (USER_FRIENDLY_DB_ERROR.hasOwnProperty(e.code)) formatError({
                httpCode: httpStatus.BAD_REQUEST,
                errorMessage: USER_FRIENDLY_DB_ERROR[e.code]
            });

            formatError({
                httpCode: e.httpCode || httpStatus.INTERNAL_SERVER_ERROR,
                errorMessage: e.message || 'Unexpected response'
            });
        }
    }
}


module.exports = {PageBase};
