const R = require('ramda');
const uuidv4 = require('uuid/v4');
const db = require('../services/DBService');
const {HOST} = require('../constants');

class Page {
    validate(data) {
        if (R.isEmpty(data)) throw new Error('Invalid data');

        this.data = data;

        return true;
    }

    async save() {
        const saveDataResult = await db.savePage({
            key: this._generateId(),
            value: this.data
        });

        if (!saveDataResult) throw new Error('Failed to save');
    }

    makeURL(key) {
        return `${HOST}/page/${key}`
    }

    _generateId() {
        return uuidv4();
    }
}

module.exports = Page;