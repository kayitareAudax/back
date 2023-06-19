const { check } = require("express-validator");
const { getVehicles, createVehicle, deleteVehicle, getVehicle,addOwner, getAll, updateVehicle } = require("../controllers/Vehicle.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

const router=require("express").Router();
router.use(verifyToken)
router.route("/").get(getVehicles);
router.route("/").post(
    check("chasis","provide a valid chasis number").exists().isLength({min:3,max:30}),
    check("manufactureCompany","provide a valid manufactureCompany").exists().isLength({min:3,max:50}),
    check("manufactureYear","provide a valid manufactureYear").exists().isLength({min:4,max:4}),
    check("price","provide a valid chasis number").exists().isNumeric(),
    check("plateNumber","provide a valid PlateNumber").exists().isLength({min:4,max:8}),
    check("modelName","provide a valid modelName").exists().isLength({min:2,max:24}),
    createVehicle)
router.route("/:id").delete(deleteVehicle);
router.route("/:id").get(getVehicle)
router.route("/:id").put(addOwner)
router.route("/all").get(getAll);
router.route("/update/:id").put(updateVehicle)
module.exports=router;