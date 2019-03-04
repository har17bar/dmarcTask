const mongoose = require('mongoose');
const AppConfigs = require('../settings/configs');
mongoose.set('useCreateIndex', true);

console.log(AppConfigs.DB_URL,'__');
module.exports = mongoose.createConnection(AppConfigs.DB_URL, { useNewUrlParser: true },function(err) {
    console.log('Mongoose default connection open to ' + AppConfigs.DB_URL);
});
