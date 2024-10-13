const mongoose = require("mongoose")

const speakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    contact: {
        type: [String],
        required: true
    }
}, { timestamps: true })

const Speaker = mongoose.model("Speaker", speakerSchema)
module.exports = Speaker