const express = require("express");
const usedAcController = require("../controllers/usedAc.controller.js")
const middleware = require("../middleware/admin.middleware.js")
const multer = require("../utils/multer.util.js")

const router = express.Router()

router.post("/create",
    middleware.verifyAdmin,
    multer.single("photo"),
    usedAcController.shopAc
)

router.patch("/:id",
    middleware.verifyAdmin,
    multer.single("photo"),
    usedAcController.AcUpdated
)

router.delete("/:id",
    middleware.verifyAdmin,
    usedAcController.AcDeleted
)

router.get("/",
    middleware.verifyAdmin,
    usedAcController.getAllAc
)

module.exports = router


