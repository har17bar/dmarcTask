const BaseQuery = require('../../../core/baseDbQuery');
const ipSourceSchema = require('./model.js');

class DomainsQuery extends BaseQuery {
    constructor() {
        super('ipSource', ipSourceSchema);
    }
}

module.exports =(new DomainsQuery).model;
