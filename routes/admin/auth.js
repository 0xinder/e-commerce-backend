const express=require('express');
const {requireSignin} =require ('../../common-middleware');
const { signUp, signIn ,signout} = require('../../controllers/admin/auth');
const {validateSignupRequest,isRequestValidated,validateSigninRequest}=require('../../validator/auth')
const router=express.Router();
router.post('/admin/signin',validateSigninRequest,isRequestValidated,signIn);
router.post('/admin/signup',validateSignupRequest,isRequestValidated,signUp);
router.post('/admin/signout',requireSignin,signout)
// router.post('/profile',,(req,res)=>[
//     res.status(400).json({
//         message:"yeah"
//     })
// ]);
module.exports=router;