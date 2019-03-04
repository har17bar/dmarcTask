const BaseQuery = require('../../core/baseDAO');
const DomainsSchema = require('./model.js');

class DomainsQuery extends BaseQuery {
    constructor() {
        super('domains', DomainsSchema);
    }
}

module.exports = (new DomainsQuery).model;
