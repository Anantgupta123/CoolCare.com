const adminModel = require("../models/admin.model.js");
const adminController = require("../controllers/admin.controller.js");
const jwt = require("jsonwebtoken")


async function verifyAdmin(req,res,next){

    try {
        const token = req.cookies?.token  //req.headers?.authorization?.split(" ")[1];
    
        if(!token){
    
            return res.status(400).json({
                message:"Token is not present"
            })
        }

    
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
    
        const admin = await adminModel.findById(decoded.email)

        req.admin = admin

        next()

    } catch (error) {

        console.log("This is not a admin", error)
        
    }
}

module.exports = {
    verifyAdmin
}