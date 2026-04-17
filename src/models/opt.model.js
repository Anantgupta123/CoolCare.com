const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    },
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    }

})

const otpModel = mongoose.model("Otp",otpSchema);

module.exports = otpModel;