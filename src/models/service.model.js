const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    photo:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true
    }

})

const serviceModel = mongoose.model("Service",serviceSchema);

module.exports = serviceModel