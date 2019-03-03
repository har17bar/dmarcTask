module.exports = {
    HttpStatuscodes:{
        serverEror :{
            name:"Internal Error",
            code:500
        },
        paramsError :{
            name:"Invalid Params",
            code:400
        },
        notFound:{
            name:"Not Found",
            code:404
        },
        alreadyRegistered:{
            name:"Already registered",
            code:409
        },
        requiredParam:{
            name:"missing required parameter",
            code:422
        },
        ok:{
            name:"ok",
            code:200
        }
    }
};