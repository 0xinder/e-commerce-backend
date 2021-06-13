const express=require('express');
const { requireSignin, userMiddleware } = require('../common-middleware/index');
const {  addItemToCart} = require('../controllers/cart');
const router=express.Router();
router.post('/user/cart/addtocart',requireSignin,userMiddleware,addItemToCart);
module.exports=router;