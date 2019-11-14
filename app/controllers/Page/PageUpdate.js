const {PageBase} = require('./PageBase');
const {USER_FRIENDLY_DB_ERROR} = require('../../constants');
const he = require('he');
const db = require('../../services/DBService');
const httpStatus = require('http-status-codes');
const {formatError} = require('../../utils/helper');
const log = require('../../singleton/logger');


class PageUpdate extends PageBase {
    constructor({eid, access_token} = {}) {
        super();

        this.access_token = access_token || null;

        this.eid = eid ? he.encode(eid) : null;
    }

    async update() {
        try {
            await this._checkAbleToModify();

            const updateResult = await db.updatePage({
                data: this.data,
                eid: this.eid
            });

            if (!Boolean(updateResult)) formatError({
                httpCode: httpStatus.BAD_REQUEST,
                errorMessage: 'Failed to update'
            });
        } catch (e) {
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

module.exports = {PageUpdate};
