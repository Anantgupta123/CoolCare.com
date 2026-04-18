//Require all packeges
const express  =require("express");
const cookieParser = require("cookie-parser")


const app = express()


//Use of all packeges
app.use(express.json());
app.use(cookieParser())



// Require all controllers Admin
const userRouter = require("./routes/user.route.js")
const adminRouter  = require("./routes/admin.route.js")
const serviceRouter = require("./routes/service.route.js")
const usedAcRouter = require("./routes/usedAc.route.js")
const projectRouter = require("./routes/project.route.js")




//Use of all routes
app.use("/api/user",userRouter);
app.use("/api/admin",adminRouter)
app.use("/api/service",serviceRouter)
app.use("/api/Ac",usedAcRouter)
app.use("/api/project",projectRouter)




app.get("/",(req,res)=>{
    res.send("Anant gupta making production level website ")
})




module.exports = app