const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        require:true
    },
    service:{
        type:String,
        enum:["Installation","Service","Repair","Pipeing","GasCharging"],
        default:"Service"
    },
    status:{
        type:String,
        enum:["Pending","Working","Complete"]
    }
})

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;