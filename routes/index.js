const router=require("express").Router();
router.use("/auth",require("./user.routes"))
router.use("/vehicle",require("./vehicle.routes"))
router.use("/owner",require("./owner.routes"))
module.exports=router;