const express = require("express");
const adminController = require("../controllers/admin.controller.js")


const router = express.Router()


router.post("/register",adminController.createAdmin)
router.post("/otp",adminController.vrifyAdmin)
router.post("/login",adminController.loginAdmin)
router.post("/logout",adminController.logoutAdmin)



module.exports = router