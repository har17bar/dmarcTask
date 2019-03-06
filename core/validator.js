const validate = require('validator');
class Validator {
    constructor() {}

    CheckIsValidDomain(domain){
        var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/); //https://stackoverflow.com/questions/13027854/javascript-regular-expression-validation-for-domain-name
        return domain.match(re);
    }
    checkIsEnum(SPF,DKIM){
        return (SPF=="pass" || SPF =="fail") ||(DKIM=="pass" || DKIM =="fail")
    }
    checkIsIP(ipaddress,loop){
        var reg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; //https://stackoverflow.com/questions/4460586/javascript-regular-expression-to-check-for-ip-addresses
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
