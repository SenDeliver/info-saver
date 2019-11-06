const R = require('ramda');
const httpStatus = require('http-status');
const uuidv4 = require('uuid/v4');
const db = require('../services/DBService');
const {HOST} = require('../constants');
const log = require('../singleton/logger');
const {formatError} = require('../utils/helper');

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
        log.info('Save data with key: %s, value: %j', this.key, this.data);

        const saveDataResult = await db.savePage({
            key: this.key,
            value: this.data
        });

        if (!saveDataResult) formatError({
            httpCode: httpStatus.INTERNAL_SERVER_ERROR,
            errorMessage: 'Failed to save'
        });
    }

    makeURL() {
        const URL = `${HOST}/page/${this.key}`;
        log.debug('Make URL - %s', URL);
        return URL
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