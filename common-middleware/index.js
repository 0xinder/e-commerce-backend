const jwt =require('jsonwebtoken');
const multer=require('multer');
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
exports.upload=multer({storage});
exports.requireSignin=(req,res,next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split(" ")[1];
        // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhhMWI5M2QwYjMwNDI1NzQyNTg1ODMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MjA2Mjc5MjEsImV4cCI6MTYyMDcxMDcyMX0.v8SOhyyWJYW_ZDEeIh2EYQUqzYqLZUHoShpeL_qiDP0"
        const user=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=user;
    }
    else {
        return res.status(400).json({message:"authorization required"});
    }
    next();
}
exports.userMiddleware=(req,res,next)=>{
    if(req.user.role !== 'user'){
        return res.status(401).json({message:'user access denied'});
    }
    next();
}
exports.adminMiddleware=(req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(401).json({message:'admin access denied'});
    }
    next();
}