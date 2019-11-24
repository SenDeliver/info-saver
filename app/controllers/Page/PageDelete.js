const {PageBase} = require('./PageBase');
const he = require('he');
const db = require('../../services/DBService');
const log = require('../../singleton/logger');
const {OPERATIONS} = require('../../constants');

class PageDelete extends PageBase{
    /**
     * @param eid
     * @param access_token
     */
    constructor({eid, access_token}) {
        super();

        this.eid = eid ? he.encode(eid) : null;
        this.access_token = access_token || null;
    }

    /**
     * Remove saved data from DB
     * @returns {Promise<void>}
     */
    async remove() {
        log.debug('Delete page with eid: %s', this.eid);

        await this.DBQueryHandler(async () => {
            await this.checkAccessibility(OPERATIONS.D);
            await db.removePage(this.eid);
        });

        log.info('Success remove');
    }
}

module.exports = {PageDelete};
