const {PageBase} = require('./PageBase');
const he = require('he');
const log = require('../../singleton/logger');
const R = require('ramda');
const {OPERATIONS} = require('../../constants');

class PageExist extends PageBase {
    /**
     * @param access_token
     * @param eid
     */
    constructor({access_token, eid}) {
        super();

        this.access_token = access_token || null;
        this.eid = eid ? he.encode(eid) : null;
    }

    /**
     * Get saved data from DB
     * @returns {Promise<f2|f1>}
     */
    async getPage() {
        log.info('Get page with eid: %s', this.eid);

        await this.DBQueryHandler(async () => {
            await this.checkAccessibility(OPERATIONS.R);
        });

        return R.pathOr({}, ['0', 'json_template'], this.page);
    }
}

module.exports = {PageExist};
