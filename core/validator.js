const validate = require('validator');
class Validator {
    constructor() {}

    CheckIsValidDomain(domain){
        return validate.isEmail(domain);
    }
    checkIsEnum(SPF,DKIM){
        return (SPF=="pass" || SPF =="fail") ||(DKIM=="pass" || DKIM =="fail")
    }
    checkIsIP(ipaddress,loop){
        var reg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (loop){
            for (let i=0; i< ipaddress.length; ++i){
                if (!reg.test(ipaddress[i])) {
                    return false;
                }
            }
            return true;
        }
        if (reg.test(ipaddress)) {
            return true;
        }
        else  return false;
    }
}
module.exports=new Validator;