const { validationResult } = require("express-validator");
const Vehicle = require("../models/Vehicle.model")
const Owner = require("../models/Owner.model")
exports.getVehicles = async (req, res, next) => {
    console.log("reached here");
    try {
        const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters, default to page 1
        const limit = parseInt(req.query.limit) || 10; // Get the number of items per page from the query parameters, default to 10

        const vehiclesCount = await Vehicle.countDocuments(); // Get the total count of vehicles
        const totalPages = Math.ceil(vehiclesCount / limit); // Calculate the total number of pages

        const skip = (page - 1) * limit; // Calculate the number of items to skip

        const vehicles = await Vehicle.find()
            .skip(skip)
            .limit(limit)
            .exec();

        return res.json({
            success: true,
            message: "Got all vehicles",
            data: vehicles,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        res.send(error);
    }
}

exports.getVehicle = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.json({ success: false, message: "No vehicle found", data: vehicle });
        }
        return res.json({ success: true, message: "vehicle found", data: vehicle })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "an error occured" });
    }
}
exports.getAll = async (req, res, next) => {
    console.log("reached here");
    try {
        const vehicles = await Vehicle.find().populate('owner').exec();
        return res.json({ success: true, message: "Got all vehicles", data: vehicles })
    } catch (error) {
        res.send(error)
    }
}
exports.createVehicle = async (req, res, next) => {
    const { chasis, manufactureCompany, manufactureYear, price, plateNumber, modelName } = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({ success: false, message: errors.array()[0].msg });
    }
    const newVehicle = await Vehicle.create(req.body);
    newVehicle.save();
    return res.json({ success: true, message: "vehicle created", data: newVehicle });

}
exports.addOwner = async (req, res, next) => {
    const { owner } = req.body;
    const id = req.params.id;
    const updated = await Vehicle.findByIdAndUpdate(id, { owner, owner });
    updated.save();
    return res.json({ success: true, message: "owner added", data: updated })
}
exports.deleteVehicle = async (req, res, next) => {
    const vehicle =await Vehicle.findByIdAndDelete(req.params.id);
    console.log('trying delete');
    return res.json({ success: true, message: "vehicle deleted" });
}