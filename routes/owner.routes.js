const { check } = require("express-validator");
const { getOwners, createOwner, deleteOwner, getOwner } = require("../controllers/owner.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

const router=require("express").Router();
router.use(verifyToken)
router.route("/").get(getOwners);
router.route("/").post(
    check("telephone","provide a valid phone number with +250").exists().isMobilePhone("en-RW"),
    check("names","provide a valid names").exists().isLength({min:3,max:50}),
    check("address","provide a valid address").exists().isLength({min:4,max:100}),
    check("nationalId","provide a valid nationalId").exists().isLength({min:16,max:16}),
    createOwner)
router.route("/:id").delete(deleteOwner)
router.route("/:id").get(getOwner)
module.exports=router;