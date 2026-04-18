const adminModel = require("../models/admin.model.js");
const bcrypt = require("bcrypt")
const otp = require("../utils/otp.util.js")
const otpModel = require("../models/opt.model.js")
const recive = require("../service/email.server.js")
const jwt = require("jsonwebtoken")


async function createAdmin(req,res){

    const {name , phone , email , address , password,verify} = req.body;

    const admin = await adminModel.findOne({email});

    if(admin){
        return res.status(401).json({
            message:"This user is alredy exist"
        })
    }

    // if(!/^[0-9]{10}$/.test(phone)){
    //         return res.status(400).json({
    //           message:"Phone number must be exactly 10 digits"
    //         })
    
    // }

    const hashing = await bcrypt.hash(password,10);

    const newAdmin = await adminModel.create({
        name,
        phone,
        address,
        email,
        password:hashing,
        verify

    })

    const generateOtp = otp.createOtp();

    const getMessage = otp.getOtpHtml(generateOtp)

    const hashOtp = await bcrypt.hash(generateOtp,10)


    const newOtp = await otpModel.create({
        admin:newAdmin._id,
        email:email,
        otp:hashOtp

    })

    await recive(email,getMessage)

    res.status(201).json({
        message:"New admin is create please vrify with email and otp",
        newAdmin
    })


}

async function vrifyAdmin(req,res){

   try {
     const {email , otp} = req.body;
 
     const adminOtp = await otpModel.findOne({email})

 
     if(!adminOtp){
         return res.status(400).json({
             message:"Invalid request"
         })
     }

     if (!otp || !adminOtp.otp) {
        return res.status(400).json({
         message: "OTP missing"
      });
      }


     const checkpassword  = await bcrypt.compare(otp,adminOtp.otp)

     
 
     if(!checkpassword){
         return res.status(400).json({
             message:"Wrong otp"
         })
     }

     const admin  = await adminModel.findOne({email})
 
     admin.verify = true
     await admin.save()
 
     const deleteOtpSchema = await otpModel.findOneAndDelete({email})
 
     const token = jwt.sign({adminId:email},process.env.JWT_SECRET,{expiresIn:"3d"});
 
     res.cookie("token",token)
 
     res.status(200).json({
         message:"Congurlation you are verifed with us",
         admin
     })

   } catch (error) {

    console.log("Error in otp controller",error)
    
   }

    
}


async function loginAdmin(req,res){

    const {email , password} = req.body;

    const admin = await adminModel.findOne({email});

    if(!admin){

        return res.status(400).json({
            message:"This id is not Invalid"
        })
    }

    const vrifyAdmin = await admin.verify
    
    if(!vrifyAdmin){

        return res.status(400).json({
            message:"This admin is not verify"
        })
    }

    const validPassword = await bcrypt.compare(password,admin.password);

    if(!validPassword){

        return res.status(400).json({
            message:"This is Wrong password"
        })
    }

    const token = jwt.sign({adminId:email}, process.env.JWT_SECRET,{expiresIn:"3d"});

    res.cookie("token",token)

    res.status(200).json({
        message:"Admin login successfully",
        admin
    })
}

async function logoutAdmin(req,res){

    const token = req.cookies?.token || req.hedres.authrization?.split(" ")[1]

    if(!token){

        return res.status(400).json({
            message:"Token is not present"
        })
    }

    res.clearCookie("token");


    res.status(201).json({
        mesage:"Logout successfully"
    })


}

module.exports = {
    createAdmin,
    vrifyAdmin,
    loginAdmin,
    logoutAdmin
}