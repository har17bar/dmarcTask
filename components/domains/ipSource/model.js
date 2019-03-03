const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;


let IpSourcesSchema = new Schema({
    Name:String,
    Ips:[],
});

module.exports = IpSourcesSchema;
