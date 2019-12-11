const httpStatus = require('http-status-codes');

const sendResponse = require('../singleton/sendResponse');
const {formatError} = require('../utils/helper');

const {PageAppear} = require('./Page/PageAppear');
const {PageExist} = require('./Page/PageExist');
const {PageUpdate} = require('./Page/PageUpdate');
const {PageDelete} = require('./Page/PageDelete');
const {ApiCtrl} = require('./ApiCtrl');

class PageCtrl extends ApiCtrl {
    constructor() {
        super();

        this.router.get('/', this.response((req, res) => sendResponse(req, res, {data: require('../data/wiki')})));

        this.router.post('/', this.response(this.create));

        this.router.get('/:eid', this.response(this.get));

        this.router.put('/:eid', this.response(this.update));

        this.router.delete('/:eid', this.response(this.remove));
    }

    async create(req, res) {
        const page = new PageAppear(req.query);

        page.validate(req.body);
        await page.save();

        const URI = page.createLinks();

        sendResponse(req, res, {data: {URI}});
    }

    async get(req, res) {
        const {eid} = req.params;
        const {access_token} = req.query;

        if (!eid) formatError({
            errorMessage: 'Invalid id',
            httpCode: httpStatus.BAD_REQUEST
        });

        const page = new PageExist({eid, access_token});
        const pageJSON = await page.getPage();

        sendResponse(req, res, {
            data: pageJSON
        })
    }

    async update(req, res) {
        const {eid} = req.params;
        const {access_token} = req.query;

        if (!eid) formatError({
            errorMessage: 'Invalid id',
            httpCode: httpStatus.BAD_REQUEST
        });

        const page = new PageUpdate({eid, access_token});
        page.validate(req.body);
        await page.update();

        sendResponse(req, res, {
            data: {result: 'Success update'}
        });
    }

    async remove(req, res) {
        const {eid} = req.params;
        const {access_token} = req.query;

        if (!eid) formatError({
            errorMessage: 'Invalid id',
            httpCode: httpStatus.BAD_REQUEST
        });

        const page = new PageDelete({eid, access_token});
        await page.remove();

        sendResponse(req, res, {
            data: {result: 'Success remove'}
        });
    }
}

module.exports = PageCtrl;
