module.exports = class ApplicationError extends Error{
    constructor(casee, msg){
        super();
        this.case = casee || '';
        this.msg = msg ||  'Something went wrong. Please try again.';
        Error.captureStackTrace(this, this.constructor);
    }
}



