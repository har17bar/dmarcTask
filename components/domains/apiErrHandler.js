const {HttpStatuscodes}= require('../../settings/constant');
module.exports = function (err, req, res, next) {
    switch (err.case) {
        case 'req':
            console.log(err);
            res.send({success: false, err: err.msg}).status(HttpStatuscodes.requiredParam.code);
            break;
        case 'param':
            console.log( err);
            res.send({success: false, err: err.msg}).status(HttpStatuscodes.paramsError.code);
            break;
        case 'server':
            console.log(err.msg.message );
            console.log(err.msg.name);
            res.send({success: false, err:HttpStatuscodes.serverEror.name}).status(HttpStatuscodes.serverEror.code);
            break;
        case 'exist':
            console.log( err);
            res.send({success: false, err: err.msg}).status(HttpStatuscodes.alreadyRegistered.code);
            break;
        default:
            console.log( err);
            res.send({success: false, err:error.msg}).status(HttpStatuscodes.serverEror.code);
    }
};
