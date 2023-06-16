const { validationResult } = require("express-validator");
const Vehicle = require("../models/Vehicle.model")

exports.getVehicles = async (req, res, next) => {
    const vehicles = await Vehicle.find();
    if (vehicles.length < 1) {
        return res.json({ success: false, message: "No vehicle found", data: vehicles });
    }
    return res.json({ success: true, message: "Vehicles found", data: vehicles });
}
exports.getVehicle = async (req, res, next) => {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
        return res.json({ success: false, message: "No vehicle found", data: vehicle });
    }
    return res.json({ success: true, message: "vehicle found", data: vehicle })
}
exports.createVehicle = async (req, res, next) => {
    const { chasis,manufactureCompany,manufactureYear,price,plateNumber,modelName }=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success: false, message: errors.array()[0].msg });
    }
    const newVehicle = await Vehicle.create(req.body);
    newVehicle.save();
    return res.json({ success: true, message: "vehicle created", data: newVehicle });

}
exports.addOwner = async (req, res, next) => {
    const owner = req.body;
    const id = req.params.id;
    const updated = await Vehicle.findByIdAndUpdate(id, { owner, owner });
    updated.save();
    return res.json({ success: true, message: "owner added", data: updated });
}
exports.deleteVehicle = async (req, res, next) => {
    const vehicle = Vehicle.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "vehicle deleted" });
}