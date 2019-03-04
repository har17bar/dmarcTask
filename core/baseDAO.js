const DBConnection = require('./db');

class BaseDAO {
    constructor(collection, schema) {
        if (!collection || !schema) {
            throw 'BaseDAO Protocol Violation';
        }
        this.model = DBConnection.model(collection, schema);
    }

}

module.exports = BaseDAO;
