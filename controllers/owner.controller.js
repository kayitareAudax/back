const { validationResult } = require("express-validator");
const Owner = require("../models/Owner.model");

exports.getOwners=async(req,res,next)=>{
    const owners=await Owner.find();
    if(owners.length<1){
        return res.json({success:false,message:"No owner found",data:owners});
    }
    return res.json({success:true,message:"owners found",data:owners});
}
exports.getOwner=async(req,res,next)=>{
    const owner=await Owner.findById(req.params.id);
    if(!owner){
        return res.json({success:false,message:"No Owner found",data:owner});
    }
    return res.json({success:true,message:"Owner found",data:owner})
}
exports.createOwner=async(req,res,next)=>{
    const {telephone,address,names,nationalId}=req.body
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.json({success:false,message:errors.array()[0].msg});
    }
    const newOwner=await Owner.create(req.body);
    newOwner.save();
    return res.json({success:true,message:"Owner created",data:newOwner});
    
}
exports.deleteOwner=async(req,res,next)=>{
    const Owner=Owner.findByIdAndDelete(req.params.id);
    return res.json({success:true,message:"Owner deleted"});
}