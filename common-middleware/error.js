exports.errorHandler=(req,res)=>{
    // console.log(err);
    console.log(req);
    console.log(res);
    return(res.status(400).json({message:req}));

}