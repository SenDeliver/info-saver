const {PageBase} = require('./PageBase');
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
        await this._DBQueryHandler(async () => {
            log.info('Update page with eid: %s', this.eid);

            await this._checkAbleToModify();

            const updateResult = await db.updatePage({
                data: this.data,
                eid: this.eid
            });

            if (!Boolean(updateResult)) formatError({
                httpCode: httpStatus.BAD_REQUEST,
                errorMessage: 'Failed to update'
            });
        });
    }

}

module.exports = {PageUpdate};
