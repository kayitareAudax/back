const express=require("express");
const app=express();
const port=process.env.PORT ||5000;
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config();
const connectDb=require("./utils/dbConn");
app.use(cors())
app.listen(port,()=>{
    console.log("app listening on port 5000")
})
app.use(express.json());
//routes;
const userRoutes=require("./routes/user.routes");
app.use("/auth",userRoutes)