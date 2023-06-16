const mongoose=require("mongoose");
const vehicleSchema=new mongoose.Schema({
    chasis:String,
    manufactureCompany:String,
    manufactureYear:String,
    price:Number,
    plateNumber:String,
    modelName:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Owner"
    }
})
const Vehicle=mongoose.model('Vehicle',vehicleSchema);
module.exports=Vehicle;