const R = require('ramda');
const httpStatus = require('http-status-codes');
const uuidv4 = require('uuid/v4');
const db = require('../../services/DBService');
const log = require('../../singleton/logger');
const {USER_FRIENDLY_DB_ERROR, OPERATIONS} = require('../../constants');
const {formatError} = require('../../utils/helper');

class PageBase {
    /**
     * BASE CONSTRUCTOR
     */
    constructor() {
        this.eid = null;
        this.data = null;
        this.access_token = null;
    };

    /**
     * Validate data before save
     * @param data
     * @returns {boolean}
     */
    validate(data) {
        log.debug('Start validate data %j', data);

        if (R.isEmpty(data)) formatError({
            httpCode: httpStatus.BAD_REQUEST,
            errorMessage: 'Invalid data'
        });

        this.data = data;

        return true;
    }

    /**
     * Make unique key - string
     * @returns {*}
     */
    makeUniqueKey() {
        return uuidv4();
    }

    /**
     * Check accessibility to data
     * @returns {Promise<void>}
     */
    async checkAccessibility(operations) {
        log.trace('Check able to modify for eid: %s, token: %s', this.eid, this.access_token);

        this.page = await db.getPage(this.eid);

        if (this.page.length < 1) formatError({
            httpCode: httpStatus.NOT_FOUND,
            errorMessage: 'Page not found'
        });

        let accessToken;

        switch (operations) {
            case OPERATIONS.R:
                accessToken = R.pathOr(null, ['0', 'access_token_read'], this.page);
                break;
            case OPERATIONS.U:
                accessToken = R.pathOr(null, ['0', 'access_token_update'], this.page);
                break;
            case OPERATIONS.D:
                accessToken = R.pathOr(null, ['0', 'access_token_delete'], this.page);
                break;
        }

        if (Boolean(accessToken) && accessToken !== this.access_token) formatError({
            httpCode: httpStatus.FORBIDDEN,
            errorMessage: 'Forbidden operation'
        });
    }

    /**
     * Wrapper for query to DB
     * @param fn
     * @returns {Promise<*>}
     */
    async DBQueryHandler(fn) {
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
