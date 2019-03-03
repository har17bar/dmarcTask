const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;


let IpSourcesSchema = new Schema({
    Name:{type:String, index: true},
    Ips:[],
});

module.exports = IpSourcesSchema;
