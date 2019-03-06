const Express = require('express');
const app = Express();
const BodyParser = require('body-parser');
const AppConfigs = require('./settings/configs');
const DomainsRouter = require('./components/apiDomainRout');
const IpSourceRouter = require('./components/apiIpSourceRout');
const ErrHandler = require('./components/apiErrHandler');


app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

app.use('/api/domains', DomainsRouter);
app.use('/api/ipSource', IpSourceRouter);
app.use(ErrHandler);
process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
        process.exit(1);
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
        process.once('SIGINT', function (code) {
            console.log('SIGINT received...');
            server.close();
        process.exit(1);
    });
});

app.listen(AppConfigs.PORT,()=>{
    console.log(`"app istening on port ${AppConfigs.PORT}!`);
});

