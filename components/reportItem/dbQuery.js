const BaseQuery = require('../../core/baseDAO');
const ReportItemSchema = require('./model.js');

class DomainsQuery extends BaseQuery {
    constructor() {
        super('reportItems', ReportItemSchema);
    }
}

module.exports =(new DomainsQuery).model;
