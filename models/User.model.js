const bcrypt=require("bcryptjs")
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken")
const userSchema=new mongoose.Schema({
    names: {
        type: String,
        required: true,
        max: 78
    },
    email: {
        type: String,
        required: true
    },
    username:{
           type:String,
           required:true
    },
    password: {
        type: String,
    },
    role:{
        type:String,
        default:"client",
        enum:["admin","client"]
    }
},
)
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
});
userSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        id: this._id
    }, process.env.JWT_SECRET, {
        expiresIn: 1 * 24 * 60 * 60
    })
}
const User=mongoose.model("User",userSchema);
module.exports=User;