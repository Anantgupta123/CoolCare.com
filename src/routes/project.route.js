const express = require("express");
const projectController = require("../controllers/project.controller")
const middleware = require("../middleware/admin.middleware.js")
const multer = require("../utils/multer.util.js")

const router = express.Router();

router.post("/create",
    middleware.verifyAdmin,
    multer.single("photo"),
    projectController.createProject
)

router.patch("/:id",
    middleware.verifyAdmin,
    multer.single("photo"),
    projectController.updatedProject
)

router.delete("/:id",
    middleware.verifyAdmin,
    projectController.deletdeProject
)

router.get("/",
    middleware.verifyAdmin,
    projectController.getAllProject
)



module.exports = router