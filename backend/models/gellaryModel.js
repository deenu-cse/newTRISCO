const mongoose = require("mongoose")

const gallerySchema = new mongoose.Schema({
    image: {
        type: String
    }
})

const Gallery = mongoose.model("Image", gallerySchema)
module.exports = Gallery