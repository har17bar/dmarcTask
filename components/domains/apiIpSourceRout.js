const Express = require('express');
const ipSourceRouter = Express.Router();
//const Domains = require('./domain/dbQuery');
const IpSource = require('./ipSource/dbQuery');
const Validate = require('../../core/validator');
const _ = require("underscore");
const Error = require('../../core/error')


ipSourceRouter.post('/',(req,res,next)=>{
    let {Ips,Name}=req.body;
    if (!Name || !Ips) throw  next(new Error('req','Mising Name or Ips'));
    if (!Validate.checkIsIP(Ips,true))  throw next({case:"param",msg:'Not ip addres'});
    IpSource.findOne({Name}, (err,ipSource)=> {
        if (err) return  next(new Error('server',err));
        if (ipSource) return next(new Error('exist','IpSourse already exist')); // harcnel ? throw next(new Error('exist','IpSourse already exist'))
        var ipSourceForCreate = new IpSource();
        ipSourceForCreate.Name = Name;
        _.each(Ips, (ip)=>{
            ipSourceForCreate.Ips.push({ ip });
        })
        ipSourceForCreate.save(function (err) {
            if (err) return  next(new Error('server',err));
            return res.send({success:true})
        });
    });
});

module.exports = ipSourceRouter;
