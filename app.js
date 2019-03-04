const Express = require('express');
const app = Express();
const BodyParser = require('body-parser');
const AppConfigs = require('./settings/configs');
const DomainsRouter = require('./components/domains/apiDomainRout');
const IpSourceRouter = require('./components/domains/apiIpSourceRout');
const ErrHandler = require('./components/domains/apiErrHandler')
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

app.use('/api/domains', DomainsRouter);
app.use('/api/ipSource', IpSourceRouter);
app.use(ErrHandler);
app.listen(AppConfigs.PORT,()=>{
    console.log(`"app istening on port ${AppConfigs.PORT}!`);
});
