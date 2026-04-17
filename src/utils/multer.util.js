const multer = require("multer");

const uploadPhoto = multer({
    storage:multer.memoryStorage()

})

module.exports = uploadPhoto