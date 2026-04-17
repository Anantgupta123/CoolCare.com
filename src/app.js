//Require all packeges
const express  =require("express");
const cookieParser = require("cookie-parser")


const app = express()


//Use of all packeges
app.use(express.json());
app.use(cookieParser())



// Require all controllers
const userRouter = require("./routes/user.route.js")
const adminRouter  = require("./routes/admin.route.js")




//Use of all routes
app.use("/api/user",userRouter);
app.use("/api/admin",adminRouter)




app.get("/",(req,res)=>{
    res.send("Anant gupta making production level website ")
})




module.exports = app