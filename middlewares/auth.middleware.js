const jwt=require("jsonwebtoken");
const User = require("../models/User.model");
exports.verifyToken=async(req,res,next)=>{
    let token;
    try {
      if (req.headers && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
      }
      if (!token) {
        return res.json({ success: false, message: "you are not authorized to access this route" })
      }
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next()
    } catch (error) {
      console.log(error);
      return res.json({success:false,message:"An error occured"})
    }
   
}
exports.filterRole=(roles)=>{
    return async(req,res,next)=>{
        const user=await User.findById(req.user.id)
        if(roles.includes(user.role)){
            return res.json({success:false,message:"You are not allowed here"});
        }
        next();
    }
}