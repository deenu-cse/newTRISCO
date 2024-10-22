const mongoose = require("mongoose")

const winnerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Winner = mongoose.model("Winner", winnerSchema)

module.exports = Winner