const express=require('express');
const { signUp, signIn } = require('../controllers/auth');
const { validateSignupRequest,isRequestValidated,validateSigninRequest } = require('../validator/auth');
const router=express.Router();
router.post('/signin',validateSigninRequest,isRequestValidated,signIn);
router.post('/signup',validateSignupRequest,isRequestValidated,signUp);
// router.post('/profile',requireSignin,(req,res)=>[
//     res.status(400).json({
//         message:"yeah"
//     })
// ]);
module.exports=router;