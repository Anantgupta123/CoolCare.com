const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    photo:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const projectModel = mongoose.model("Projects",projectSchema);

module.exports = projectModel

