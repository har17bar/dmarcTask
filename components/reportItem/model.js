const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;


let DomainsSchema = new Schema({
    Ip:String,
    Count:Number,
    SPF : {type: String, enum: ['fail', 'pass']},
    DKIM :{type: String, enum: ['fail', 'pass']},
    domainId: { type: Schema.Types.ObjectId, ref: 'domains' } // ref is _id not a domainName for better performance
});

module.exports = DomainsSchema;
