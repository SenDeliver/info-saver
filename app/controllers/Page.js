const R = require('ramda');
const httpStatus = require('http-status-codes');
const uuidv4 = require('uuid/v4');
const db = require('../services/DBService');
const {URL} = require('../constants');
const log = require('../singleton/logger');
const {formatError} = require('../utils/helper');
const {USER_FRIENDLY_DB_ERROR} = require('../constants');

class PageBase {
    constructor() {
        this.key = null;
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
}

class PageEmerging extends PageBase {
    constructor({key, make_access_token} = {}) {
        super();

        this.key = key || this._makeUniqueKey();
        this.access_token = make_access_token === 'true' ? this._makeUniqueKey() : null;
    }

    async save() {
        try {
            log.info('Save data with key: %s, value: %j', this.key, this.data);

            const saveDataResult = await db.savePage({
                key: this.key,
                value: this.data,
                access_token: this.access_token
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
        let URI = `${URL}/page/${this.key}`;

        if (this.access_token) URI = `${URI}?access_token=${this.access_token}`;

        log.debug('Make URL - %s', URI);
        return URI
    }
}

class PageExisting extends PageBase {
    constructor({access_token, key}) {
        super();

        this.access_token = access_token || null;
        this.key = key;
    }

    async getPage() {
        const dbResult = await db.getPage(this.key);

        if (dbResult.length < 1) formatError({
            httpCode: httpStatus.NOT_FOUND,
            errorMessage: 'Page not found'
        });

        const JSONTemplate = R.pathOr({}, ['0', 'json_template'], dbResult);
        const accessToken = R.pathOr(null, ['0', 'access_token'], dbResult);

        if (Boolean(accessToken) && accessToken !== this.access_token) formatError({
            httpCode: httpStatus.FORBIDDEN,
            errorMessage: 'Forbidden operation'
        });

        return JSONTemplate;
    }
}

module.exports = {
    PageExisting,
    PageEmerging
};