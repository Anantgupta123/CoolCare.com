const imagekit =require("imagekit")

const sendPhoto = new imagekit({
    publicKey:process.env.PUBLIC_KEY,
    privateKey:process.env.PRIVATE_KEY,
    urlEndpoint:process.env.URL_ENDPOINT
})

 async function uploadPhoto(file,filename){

    const result =await sendPhoto.upload({
        file:file,
        fileName:filename
    })

    return result

}

module.exports = uploadPhoto



