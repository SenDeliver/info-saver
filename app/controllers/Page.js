const R = require('ramda');
const httpStatus = require('http-status-codes');
const uuidv4 = require('uuid/v4');
const db = require('../services/DBService');
const {URL} = require('../constants');
const log = require('../singleton/logger');
const {formatError} = require('../utils/helper');
const {USER_FRIENDLY_DB_ERROR} = require('../constants');

class Page {
    constructor({key} = {}) {
        this.key = key || this._generateId();
        this.data = null;

        log.debug('Generate key: %s', this.key);
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

    async save() {
        try {
            log.info('Save data with key: %s, value: %j', this.key, this.data);

            const saveDataResult = await db.savePage({
                key: this.key,
                value: this.data
            });

            if (!Boolean(saveDataResult)) formatError({
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                errorMessage: 'Failed to save'
            });
        } catch (e) {
            if (USER_FRIENDLY_DB_ERROR.hasOwnProperty(e.code)) formatError({
                httpCode: httpStatus.BAD_REQUEST,
                errorMessage: USER_FRIENDLY_DB_ERROR[e.code]
            });

            throw new Error(e);
        }
    }

    makeURI() {
        const URI = `${URL}/page/${this.key}`;
        log.debug('Make URL - %s', URI);
        return URI
    }

    async getPage() {
        const dbResult = await db.getPage(this.key);

        if (dbResult.length < 1) formatError({
            httpCode: httpStatus.NOT_FOUND,
            errorMessage: 'Page not found'
        });

        return R.pathOr({}, ['0', 'json_template'], dbResult);
    }

    _generateId() {
        return uuidv4();
    }
}

module.exports = Page;