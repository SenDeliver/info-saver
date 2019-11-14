const {PageBase} = require('./PageBase');
const he = require('he');
const db = require('../../services/DBService');
const httpStatus = require('http-status-codes');
const {URL} = require('../../constants');
const {formatError} = require('../../utils/helper');
const log = require('../../singleton/logger');

class PageAppear extends PageBase {
    constructor({eid, make_access_token} = {}) {
        super();

        this.eid = eid ? he.encode(eid) : this._makeUniqueKey();
        this.access_token = make_access_token === 'true' ? this._makeUniqueKey() : null;
    }

    async save() {
        await this._DBQueryHandler(async () => {
            log.info('Save data with eid: %s, value: %j', this.eid, this.data);

            const saveDataResult = await db.savePage({
                eid: this.eid,
                value: this.data,
                access_token: this.access_token
            });

            if (!Boolean(saveDataResult)) formatError({
                httpCode: httpStatus.INTERNAL_SERVER_ERROR,
                errorMessage: 'Failed to save'
            });
        });
    }


    makeURI() {
        let URI = `${URL}/page/${this.eid}`;

        if (this.access_token) URI = `${URI}?access_token=${this.access_token}`;

        log.debug('Make URL - %s', URI);
        return URI
    }
}

module.exports = {PageAppear};
