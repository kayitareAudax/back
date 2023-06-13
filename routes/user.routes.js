const router=require("express").Router();
const {check}=require("express-validator")
const {loginUser,registerUser, adminDash}=require("../controllers/user.controllers")
const { verifyToken, filterRole } = require("../middlewares/auth.middleware");
router.route("/register").post(check("names","please provide full names").exists().isLength({min:2,max:120}),
check("username","please enter a valid username").exists().isLength({min:3,max:100}),
check("password","please enter a valid password").exists().isLength({min:6,max:12}),
check("email","please enter a valid email").exists().isEmail(),registerUser)
router.route("/login").post(check("password","Please enter a valid password").exists().isLength({min:6,max:40}),loginUser)
router.route("/admin").get(verifyToken,filterRole("admin"),adminDash)
module.exports=router;