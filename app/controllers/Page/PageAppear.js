const {PageBase} = require('./PageBase');
const he = require('he');
const db = require('../../services/DBService');
const httpStatus = require('http-status-codes');
const {URL} = require('../../conf');
const {formatError} = require('../../utils/helper');
const log = require('../../singleton/logger');
const {PROTECTION_LVL, PROTECTION_FOR_OPERATIONS, OPERATIONS} = require('../../constants');

class PageAppear extends PageBase {
    /**
     * @param eid
     * @param accessibility
     */
    constructor({eid, accessibility} = {}) {
        super();

        this.eid = eid ? he.encode(eid) : this.makeUniqueKey();

        this.access_token_read = null;
        this.access_token_update = null;
        this.access_token_delete = null;

        this.protectionLevel = this._determinationLevelProtection(accessibility);
    }

    /**
     * Save data to DB
     * @returns {Promise<void>}
     */
    async save() {
        log.debug('Try to save data with eid: %s, value: %j', this.eid, this.data);

        const saveDataResult = await this.DBQueryHandler(
            async () => db.savePage({
                eid: this.eid,
                value: this.data,
                protection_level: this.protectionLevel,
                access_token_read: this.access_token_read,
                access_token_update: this.access_token_update,
                access_token_delete: this.access_token_delete
            })
        );

        if (!Boolean(saveDataResult)) formatError({
            httpCode: httpStatus.INTERNAL_SERVER_ERROR,
            errorMessage: 'Failed to save'
        });

        log.info('Success save data');
    }


    /**
     * Make URI for save data
     * @param access_token
     * @returns {string}
     * @private
     */
    _makeURI(access_token) {
        let URI = `${URL}/page/${this.eid}`;

        if (access_token) URI = `${URI}?access_token=${access_token}`;

        log.debug('Make URL - %s', URI);
        return URI
    }

    /**
     * Create access links
     * @returns {string|*[]}
     */
    createLinks() {
        if (this.protectionLevel === PROTECTION_LVL.WITHOUT_PROTECTION) {
            return this._makeURI();
        } else {
            return [
                {read: this._makeURI(this.access_token_read)},
                {update: this._makeURI(this.access_token_update)},
                {delete: this._makeURI(this.access_token_delete)}
            ]
        }
    }

    /**
     * @param accessibility
     * @returns {number}
     * @private
     */
    _determinationLevelProtection(accessibility = []) {
        if (accessibility.length < 1) return PROTECTION_LVL.WITHOUT_PROTECTION;

        const accessibilitySplit = accessibility.split(',').map(lvl => lvl.toUpperCase());

        let protectionLevel = Math.max(...accessibilitySplit.map(access => PROTECTION_FOR_OPERATIONS[OPERATIONS[access]])) || PROTECTION_LVL.WITHOUT_PROTECTION;

        switch (protectionLevel) {
            case PROTECTION_LVL.READ:
                this.access_token_read = this.makeUniqueKey();
                this.access_token_update = this.makeUniqueKey();
                this.access_token_delete = this.makeUniqueKey();
                break;
            case PROTECTION_LVL.UPDATE:
                this.access_token_update = this.makeUniqueKey();
                this.access_token_delete = this.makeUniqueKey();
                break;
            case PROTECTION_LVL.DELETE:
                this.access_token_delete = this.makeUniqueKey();
                break;
            default:
                break;
        }

        return protectionLevel;
    }
}

module.exports = {PageAppear};
