const userModel = require("../models/user.model.js")

async function newUser(req,res){

    const {name , phone , address , service,status} = req.body;
    
    // const user = await userModel.findOne({phone})

    //Here is need to thing about what if user is exist 

    if(phone.length !== 10){
        
        return res.status(400).json({
            message:"Phone must be 10 digit"
        })
    }

    const createUser = await userModel.create({
        name,
        phone,
        address,
        service,  //How to check user history
        status  //Here is also a problem whene user is entered but this is can only admin 
    })

    res.status(201).json({
        message:"You are verify",
        createUser
    })


}



module.exports = {
    newUser
}