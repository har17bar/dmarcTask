const Express = require('express');
const ipSourceRouter = Express.Router();
const Domains = require('./domain/dbQuery');
const IpSource = require('./ipSource/dbQuery');
const {HttpStatuscodes}= require('../../settings/constant');
const Validate = require('../../core/validator');

ipSourceRouter.post('/',(req,res)=>{
    let {Ips,Name}=req.body;
    if (!Name || !Ips)  return res.send({success:false,err:HttpStatuscodes.requiredParam.name}).status(HttpStatuscodes.requiredParam.code);
    if (Ips?!Validate.checkIsIP(Ips,true):false){
        return res.send({success:false,err:HttpStatuscodes.paramsError.name + ' Not ip addres'}).status(HttpStatuscodes.paramsError.code);
    }
    IpSource.findOne({Name}, (err,ipSource)=> {
        if (err) return res.send({success:false,err:HttpStatuscodes.serverEror.name}).status(HttpStatuscodes.serverEror.code);
        if (ipSource) return res.send({success:false,err:HttpStatuscodes.alreadyRegistered.name + ' IpSource'}).status(HttpStatuscodes.alreadyRegistered.code);
        let ipSourceForCreate = new IpSource();
        ipSourceForCreate.Ips.push(Ips);
        ipSourceForCreate.Name =Name;
        ipSourceForCreate.save((err) => {
            if (err) return res.send({success:false,err:HttpStatuscodes.serverEror.name}).status(HttpStatuscodes.serverEror.code);
            res.send({success:true}).status(HttpStatuscodes.ok.code);
        });
    });
});

ipSourceRouter.post('/',(req,res)=>{
    let {Ips,Name}=req.body;
    if (!Name || !Ips)  return res.send({success:false,err:HttpStatuscodes.requiredParam.name}).status(HttpStatuscodes.requiredParam.code);
    if (!Validate.checkIsIP(Ips,true)){
        return res.send({success:false,err:HttpStatuscodes.paramsError.name + ' Not ip addres'}).status(HttpStatuscodes.paramsError.code);
    }
    IpSource.findOne({Name}, (err,ipSource)=> {
        if (err) return res.send({success:false,err:HttpStatuscodes.serverEror.name}).status(HttpStatuscodes.serverEror.code);
        if (ipSource) return res.send({success:false,err:HttpStatuscodes.alreadyRegistered.name + ' IpSource'}).status(HttpStatuscodes.alreadyRegistered.code);
        IpSource.create(
            { $push: { Ips: Ips } },
        );
        let ipSourceForCreate = new IpSource();
        _.each(Ips,(ip)=>{
            ipSourceForCreate.Ips.push(ip);
        })
        ipSourceForCreate.Name =Name;
        ipSourceForCreate.save((err) => {
            if (err) return res.send({success:false,err:HttpStatuscodes.serverEror.name}).status(HttpStatuscodes.serverEror.code);
            res.send({success:true}).status(HttpStatuscodes.ok.code);
        });
    });
});
module.exports = ipSourceRouter;