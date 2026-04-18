const express = require("express");
const serviceController = require("../controllers/service.controller.js");
const adminMiddleware =require("../middleware/admin.middleware.js")
const photoSender = require("../utils/multer.util.js")

const router = express.Router()

router.post("/create",
    adminMiddleware.verifyAdmin,
    photoSender.single("photo"),
    serviceController.cresteService
)

router.post("/update",
    adminMiddleware.verifyAdmin,
    photoSender.single("photo"),
    serviceController.updateSevice
)

router.patch("/:id",
    adminMiddleware.verifyAdmin,
    serviceController.updateSevice
)

router.delete("/:id",
    adminMiddleware.verifyAdmin,
    serviceController.deleteService
)

router.get("/",
    adminMiddleware.verifyAdmin,
    serviceController.getAllService
)




module.exports = router