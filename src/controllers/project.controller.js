const projectModel = require("../models/project.model.js")
const uploadPhoto = require("../service/imagekit.service.js");
const {v4:uuid} = require("uuid")

async function createProject(req,res){

    const sendPhoto = await uploadPhoto(req.file.buffer,`${uuid().jpg}`)

    const photo =await sendPhoto.url

    const {name , address , description,date} = req.body;

    const newProject = await projectModel.create({
        photo,
        name,
        address,
        description,
        date

    })

    res.status(201).json({
        message:"New project created successfully",
        newProject
    })

}

async function updatedProject(req,res){

    const {id} = req.params

     const sendPhoto = await uploadPhoto(req.file.buffer,`${uuid().jpg}`)

    const photo =await sendPhoto.url 

    const {name , address , description} = req.body;

    const updated = await projectModel.findByIdAndUpdate(
        id,
        {
            photo,
            name,
            description,
            address
        },
        {new:true}
    )

    res.status(200).json({
        message:"Project detail updated",
        updated
    })
}


async function deletdeProject(req,res){

    const {id} = req.params;

    const projectDelete = await projectModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Project deletde successfully",
        projectDelete
    })
}

async function getAllProject(req,res){

    const getproject = await projectModel.find();
    
    res.status(200).json({
        message:"All peoject",
        getproject
    })
}

module.exports = {
    createProject,
    updatedProject,
    deletdeProject,
    getAllProject
}