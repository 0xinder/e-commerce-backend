const User =require('../../models/user');
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const shortid=require('shortid');
exports.signUp=(req,res)=>{
    User.findOne({email:req.body.email}).exec(async (error,user)=>{
        if(user){
            return res.status(400).json({message:'admin already registered'});}
        const {firstName,lastName,email,password}=req.body;
        const hash_password= await bcrypt.hash(password,10);
        const _user =new User({firstName,lastName,email,hash_password,username:shortid.generate(),role:'admin'});
        _user.save((error,data)=>{
            if(data){return res.status(201).json({
                    user:data,
                    message:'Admin created'})};
            if(error){
                return res.status(400).json({message:'something went wrong'});};
        });
    });
}

exports.signIn=(req,res)=>{
    User.findOne({email:req.body.email}).exec((error,user)=>{
        if(error){return(res.status(400).json({message:'not found'}));}
        if(user){
            if(user.authenticate(req.body.password)&&user.role==='admin'){
                console.log('h')
                const token=jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:'23h'});
                const {_id,firstName,lastName,email,role,fullName}=user;
                res.cookie('token',token,{expiresIn:'23h'});
                res.status(200).json({
                    token,
                    user:{_id,firstName,lastName,email,role,fullName},
                });}
                
            else{res.status(400).json({message:'invalid '});}}
        else{return(res.status(400).json({message:"something went wrong"}));}
    });
};

exports.signout=(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({
        message:'Signout Successfull'
    })
}