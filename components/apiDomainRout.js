const Express = require('express');
const DomainsRouter = Express.Router();
const Domains = require('./domain/dbQuery');
const ReportItems = require('./reportItem/dbQuery');
const {HttpStatuscodes}= require('../settings/constant');
const Validate = require('../core/validator');

//Add Domain
DomainsRouter.post('/', (req, res) => {
   let {Domain} = req.body;
   if (!Domain)  return res.send({success:false,err:HttpStatuscodes.requiredParam.name+' Domain'}).status(HttpStatuscodes.requiredParam.code);
   if (!Validate.CheckIsValidDomain(Domain)) {
      return res.send({success:false,err:HttpStatuscodes.paramsError.name + ' not valid domain name'}).status(HttpStatuscodes.paramsError.code);
   }
   Domains.findOne({Domain}, (err,domain)=> {
      if (err) return res.send({success:false,err:HttpStatuscodes.serverEror.name}).status(HttpStatuscodes.serverEror.code);
      if (domain) return res.send({success:false,err:HttpStatuscodes.alreadyRegistered.name + ' domain'}).status(HttpStatuscodes.alreadyRegistered.code);
      Domains.create({Domain}, (err)=>{
         if (err) return res.send({success:false,err:HttpStatuscodes.serverEror.name}).status(HttpStatuscodes.serverEror.code);
         res.send({success:true}).status(HttpStatuscodes.ok.code);
      })
   });
});



//Add Reports To specific domain
DomainsRouter.post('/ReportsForDomain', (req, res) => {
   let {Domain,Ip,SPF,DKIM,Count} = req.body;
   if (!Domain)  return res.send({success:false,err:HttpStatuscodes.requiredParam.name+' Domain'}).status(HttpStatuscodes.requiredParam.code);
   if (!Validate.CheckIsValidDomain(Domain ) || !SPF || !DKIM || !Ip || !Validate.checkIsEnum(SPF) ||  !Validate.checkIsEnum(SPF) ||!Validate.checkIsIP(Ip,false)) {
      return res.send({success:false,err:HttpStatuscodes.paramsError.name + 'Not enum value'}).status(HttpStatuscodes.paramsError.code);
   }
   Domains.findOne({Domain},  (err, domain)=> {
      if (!domain)  return res.send({success:false,err:HttpStatuscodes.notFound.name + ' domain'}).status(HttpStatuscodes.notFound.code);
      req.body.domainId=domain._id;

      ReportItems.create(req.body,(err) =>{
         if (err) return res.send({success:false,err:HttpStatuscodes.serverEror.name}).status(HttpStatuscodes.serverEror.code);
         res.send({success:true}).status(HttpStatuscodes.ok.code);
      })
   });
});

//Edit Reports of specific domain
DomainsRouter.put('/ReportsForDomain', (req, res) => {
   let {Domain,SPF,DKIM,Ip} = req.body;
   if (!Domain)  return res.send({success:false,err:HttpStatuscodes.requiredParam.name+' Domain'}).status(HttpStatuscodes.requiredParam.code);
   if (!Validate.CheckIsValidDomain(Domain )  ) {
      return res.send({success:false,err:HttpStatuscodes.paramsError.name}).status(HttpStatuscodes.paramsError.code);
   }
   if ( SPF ? !Validate.checkIsEnum(SPF):false || DKIM ? !Validate.checkIsEnum(DKIM):false) {
      return res.send({success:false,err:HttpStatuscodes.paramsError.name + ' Not enum value'}).status(HttpStatuscodes.paramsError.code);
   }
   if (Ip?!Validate.checkIsIP(Ip,false):false){
      return res.send({success:false,err:HttpStatuscodes.paramsError.name + ' Not ip addres'}).status(HttpStatuscodes.paramsError.code);
   }
   Domains.findOne({Domain}, (err,domain)=> {
      if (err) return res.send({success:false,err:HttpStatuscodes.serverEror.name}).status(HttpStatuscodes.serverEror.code);
      if (!domain) return res.send({success:false,err:HttpStatuscodes.notFound.name + ' domain'}).status(HttpStatuscodes.notFound.code);

      delete req.body._id; // for secure
      delete req.body.domainId;

      ReportItems.update({ domainId: domain._id},req.body,(err)=>{
         if (err) return res.send({success:false,err:HttpStatuscodes.serverEror.name}).status(HttpStatuscodes.serverEror.code);
         res.send({success:true}).status(HttpStatuscodes.ok.code);
      })
   });
});

module.exports = DomainsRouter;
