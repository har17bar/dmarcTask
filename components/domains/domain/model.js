const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;


let DomainsSchema = new Schema({
    Domain: { type: String, unique: true }

});

module.exports = DomainsSchema;





