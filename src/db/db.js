const mongoose = require("mongoose")


async function connectDB(){

   try {
     await mongoose.connect(process.env.MONGO_URI)

     console.log("Data base is connect to DB")

   } catch (error) {

    console.log("Some  went wrong in data base",error)
    
   }
}


module.exports = connectDB;