const serviceModel = require("../models/service.model.js");
const uploadPhoto = require("../service/imagekit.service.js")
const {v4:uuid} = require("uuid")

async function cresteService(req,res){

    const upload = uploadPhoto(req.file.buffer,uuid())

    const photo = upload.url

    const {name,price,description} = req.body;

    if(!photo || !name || !price || !description){

        return res.status(400).json({
            message:"Please enter all data"
        })
    }

    const service = await serviceModel.findOne({name});

    if(service){
        return res.status(400).json({
            message:"This service is alredy exist"
        })
    }

    const newService = await serviceModel.create({
        photo,
        name,
        price,
        description
    })

    res.status(201).json({
        message:"Created successfully service",
        newService
    })

}

async function updateSevice(req,res){

    const {id} = req.params

    const upload = uploadPhoto(req.file.buffer,uuid());

    const photo = upload.url

    const {name , price, description} = req.body;

    const updatedService = await serviceModel.findByIdAndUpdate(
        id,
        photo,
        name,
        price
    ) 

    res.status(200).json({
        message:"Service data updated successfully",
        updatedService
    })

}

async function deleteService(req,res){

    const {id} = req.params

    const service = await serviceModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"service datele successfully"
    })

}

async function getAllService(req,res){

    const service = await serviceModel.find()

    res.status(200).json({
        message:"All services",
        service
    })
}



module.exports = {
    cresteService,
    updateSevice,
    deleteService,
    getAllService
}