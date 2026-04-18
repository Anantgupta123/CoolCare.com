const mongoose = require("mongoose");

const usedAcSchema = new mongoose.Schema({
    photo:{
        type:String,
        required:true,
        unique:true
    },
    brand:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    old:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true,
        unique:true
    }
})

const userACModel = mongoose.model("usedAc",usedAcSchema);

module.exports = userACModel