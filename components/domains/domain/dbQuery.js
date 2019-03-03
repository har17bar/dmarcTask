const BaseQuery = require('../../../core/baseDbQuery');
const DomainsSchema = require('./model.js');

class DomainsQuery extends BaseQuery {
    constructor() {
        super('domains', DomainsSchema);
    }
}

module.exports = (new DomainsQuery).model;
