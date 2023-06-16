const mongoose=require("mongoose");
const ownerSchema=new mongoose.Schema({
    names:String,
    nationalId:String,
    telephone:String,
    address:Number,
})
const Owner=mongoose.model('Owner',ownerSchema);
module.exports=Owner;