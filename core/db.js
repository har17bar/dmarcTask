const mongoose = require('mongoose');
const AppConfigs = require('../settings/configs');
mongoose.set('useCreateIndex', true);
module.exports = mongoose.createConnection(AppConfigs.DB_URL, { useNewUrlParser: true });
