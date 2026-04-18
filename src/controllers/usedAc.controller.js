const usedAcModel = require("../models/usedAc.model");
const uploadPhoto = require("../service/imagekit.service")
const {v4:uuid} = require("uuid")



async function shopAc(req,res){

    const uploadAc = await uploadPhoto(req.file.buffer,`${uuid()}.jpg`);

    const photo = uploadAc.url;

    const {brand , price , old , weight ,description, code} = req.body ; 

    const newAc = await usedAcModel.create({
        photo,
        brand,
        price,
        code,
        old,
        weight,
        description
    })

    res.status(201).json({
        message:"New  ac is added",
        newAc
    })
}

async function AcUpdated(req,res){

    const {id} = req.params

    const uploadAc =await uploadPhoto(req.file.buffer,`${uuid()}.jpg`)

    const photo = (await uploadAc).url

    const {brand , price , old , weight ,description, code} = req.body ;

    const updated = await usedAcModel.findByIdAndUpdate(
        id,
        {
            photo,
            brand,
            price,
            old,
            weight,
            description,
            code

        },
        {new:true}
    )

    res.status(200).json({
        message:"Ac detail updated successfully",
        updated
    })


}

async function AcDeleted(req,res){

    const {id} = req.params;

    const shopAc = await usedAcModel.findByIdAndDelete(id)

    res.status(201).json({
        message:"Ac is deletde successfully"
    })
}

async function getAllAc(req,res){

    const {id} = req.params;

    const getAllAc = await usedAcModel.find()

    res.status(200).json({
        message:"All shops",
        getAllAc
    })
}


module.exports = {
    shopAc,
    AcUpdated,
    AcDeleted,
    getAllAc
}