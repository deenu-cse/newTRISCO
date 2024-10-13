const mongoose = require("mongoose")

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    where: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    link: {
        type: String
    }
}, { timestamps: true })

const Hero = mongoose.model("Hero", heroSchema)
module.exports = Hero