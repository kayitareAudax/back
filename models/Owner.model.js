const mongoose=require("mongoose");
const ownerSchema=new mongoose.Schema({
    names:String,
    nationalId:String,
    telephone:String,
    address:String,
})
const Owner=mongoose.model('Owner',ownerSchema,'owners');
module.exports=Owner;