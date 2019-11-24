const {PageBase} = require('./PageBase');
const he = require('he');
const db = require('../../services/DBService');
const httpStatus = require('http-status-codes');
const {formatError} = require('../../utils/helper');
const log = require('../../singleton/logger');
const {OPERATIONS} = require('../../constants');

class PageUpdate extends PageBase {
    /**
     * @param eid
     * @param access_token
     */
    constructor({eid, access_token} = {}) {
        super();

        this.access_token = access_token || null;
        this.eid = eid ? he.encode(eid) : null;
    }

    /**
     * Update saved data in DB
     * @returns {Promise<void>}
     */
    async update() {
        log.debug('Update page with eid: %s', this.eid);

        const updateResult = await this.DBQueryHandler(async () => {
            await this.checkAccessibility(OPERATIONS.U);
            return db.updatePage({
                data: this.data,
                eid: this.eid
            });
        });

        if (!Boolean(updateResult)) formatError({
            httpCode: httpStatus.BAD_REQUEST,
            errorMessage: 'Failed to update'
        });

        log.info('Success update');
    }

}

module.exports = {PageUpdate};
