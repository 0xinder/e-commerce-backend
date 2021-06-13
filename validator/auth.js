const {check, validationResult}= require('express-validator');
exports.validateSignupRequest=[
    check('firstName').notEmpty().withMessage('firstname is required'),
    check('lastName').notEmpty().withMessage('lastName is required'),
    check('email').isEmail().withMessage('email is required'),
    check('password').isLength({min:6}).withMessage('password must be atleast 6 characters long')
];
exports.isRequestValidated=(req,res,next)=>{
    const errors=validationResult(req);
    if(errors.array().length>0){
        return res.status(401).json({error:errors.array()[0].msg})
    }
    next();
}
exports.validateSigninRequest=[
    check('email').isEmail().withMessage('email is required'),
    check('password').isLength({min:6}).withMessage('password must be atleast 6 characters long')
];