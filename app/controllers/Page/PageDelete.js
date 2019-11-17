const {PageBase} = require('./PageBase');
const he = require('he');
const db = require('../../services/DBService');
const log = require('../../singleton/logger');

class PageDelete extends PageBase{
    constructor({eid, access_token}) {
        super();

        this.eid = eid ? he.encode(eid) : null;
        this.access_token = access_token || null;
    }

    async remove() {
        log.debug('Delete page with eid: %s', this.eid);

        await this._DBQueryHandler(async () => {
            await this._checkAbleToModify();
            await db.removePage(this.eid);
        });

        log.info('Success remove');
    }
}

module.exports = {PageDelete};
