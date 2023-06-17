const mongoose=require("mongoose");
const Owner=require("./Owner.model");
const vehicleSchema=new mongoose.Schema({
    chasis:String,
    manufactureCompany:String,
    manufactureYear:String,
    price:Number,
    plateNumber:String,
    modelName:String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "owners",
      },
})
const Vehicle=mongoose.model('Vehicle',vehicleSchema);
module.exports=Vehicle;