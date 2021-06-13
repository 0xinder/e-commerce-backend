const User =require('../models/user');
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const shortid=require('shortid');
const { errorHandler } = require('../common-middleware/error');
exports.signUp=(req,res)=>{
    User.findOne({email:req.body.email}).exec(async (error,user)=>{
        if(user) {
            // return errorHandler(user);
            return res.status(400).json({message:'email already registered'});
        }
        const {firstName,lastName,email,password}=req.body;
        const hash_password= await bcrypt.hash(password,10);
        const _user =new User({firstName,lastName,email,hash_password,username:shortid.generate()});
        _user.save((error,data)=>{
            if(data){return res.status(201).json({
                    user:data,
                    message:'user created successfully'})};
            if(error){
                return res.status(400).json({message:'something went wrong'});};
        });
    });
}
exports.signIn=(req,res)=>{
        User.findOne({email:req.body.email}).exec((error,user)=>{
        if(error){
            // errorHandler(error)
            return(res.status(400).json({message:'not found'}));
        }
        if(user){
            console.log(user);
            if(user.authenticate(req.body.password)&&user.role==='user'){
                const token=jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:'23h'});
                const {_id,firstName,lastName,email,role,fullName}=user;
                res.status(200).json({
                    token,
                    user:{_id,firstName,lastName,email,role,fullName},
                });}
            else{res.status(400).json({message:'Something went wrong'});}}
        else{return(res.status(400).json({message:"something went wrong"}));}
    });
};
