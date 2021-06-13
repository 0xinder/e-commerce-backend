const express=require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware/index');
const { addCategory, getCategories } = require('../controllers/category');
const { createProduct, getProductsBySlug, getProductDetailsById } = require('../controllers/product');
const multer=require('multer');
const router=express.Router();
const shortid=require('shortid');
const path=require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate()+"-"+file.originalname)
    }
  })
const upload=multer({storage});
router.post('/product/create',requireSignin,adminMiddleware,upload.array('productPicture'),createProduct);
router.get('/products/:slug',getProductsBySlug);
// router.get('/category/getCategories',getCategories);
router.get('/product/:productId',getProductDetailsById);
module.exports=router;
