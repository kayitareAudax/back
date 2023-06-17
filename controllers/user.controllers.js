const User=require("../models/User.model");
const {check,validationResult}=require("express-validator");
exports.registerUser=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.json({success:false,message:errors.array()[0].msg});
    }
    const {email,password,names,username}=req.body;
    let user = await User.findOne({
        email
    })
    if (user){
        return res.json({success:false,message:"email already registered"})
    }
    const newUser=await User.create(req.body);
    newUser.save();
    return res.json({success:true,message:newUser.generateAuthToken()});
}
exports.loginUser=async(req,res,next)=>{
    const { email, password } = req.body;
    const user = await User.findOne({ email});
    if (!user) {
        return res.json({success:false,message:"invalid credentials"});
    }
    const isMatch = await user.matchPasswords(password);
  
    if (!isMatch) {
        return res.json({success:false,message:"invalid credentials"});
    }
        return res.json({success:true,message:user.generateAuthToken()}); 
}
exports.adminDash=async(req,res,next)=>{
    console.log(req.user);
    const user=await User.findById(req.user.id).select("-password");
    if(!user){
        return res.json({success:false,message:"user not found"});
    }
    return res.json({success:true,message:user});
}