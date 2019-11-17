const {PageBase} = require('./PageBase');
const he = require('he');
const db = require('../../services/DBService');
const httpStatus = require('http-status-codes');
const {formatError} = require('../../utils/helper');
const log = require('../../singleton/logger');
const R = require('ramda');

class PageExist extends PageBase {
    constructor({access_token, eid}) {
        super();

        this.access_token = access_token || null;
        this.eid = eid ? he.encode(eid) : null;
    }

    async getPage() {
        log.info('Get page with eid: %s', this.eid);

        const dbResult = await this._DBQueryHandler(async () => db.getPage(this.eid));

        log.debug('Response from DB for Get page: %j', dbResult);

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

module.exports = {PageExist};
