const Express = require('express');
const app = Express();
const BodyParser = require('body-parser');
const AppConfigs = require('./settings/configs');
const DomainsRouter = require('./components/domains/api_Domain');
const ipSourceRouter = require('./components/domains/api_IpSource');

app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

app.use('/api/domains', DomainsRouter);
app.use('/api/ipSource', ipSourceRouter);


app.listen(AppConfigs.PORT);