const express = require("express");
const userController = require("../controllers/user.controller.js")


const router = express.Router()


router.post("/register",userController.newUser)



module.exports = router