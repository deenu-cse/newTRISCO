const mongoose = require("mongoose");

const iformSchema = mongoose.Schema({
    GalleryType: {
        type: String,
        required: true
    },
    links: [{
        type: String,
        required: true 
    }]
});

const Igallery = mongoose.model("Igallery", iformSchema);

module.exports = Igallery;
