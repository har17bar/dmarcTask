const BaseQuery = require('../../../core/baseDbQuery');
const ReportItemSchema = require('./model.js');

class DomainsQuery extends BaseQuery {
    constructor() {
        super('reportItems', ReportItemSchema);
    }
}

module.exports =(new DomainsQuery).model;
