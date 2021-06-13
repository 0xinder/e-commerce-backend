const express=require('express');
const { upload, adminMiddleware, requireSignin } = require('../../common-middleware');
const { createPage, getPage } = require('../../controllers/admin/page');
const router=express.Router();
router.post('/page/create',requireSignin,adminMiddleware,upload.fields([{name:'banners'},{name:'products'}]),createPage)
router.get('/page/:category/:type',getPage)
module.exports=router;