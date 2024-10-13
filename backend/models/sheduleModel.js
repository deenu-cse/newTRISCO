const mongoose = require("mongoose")

const sheduleSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    }
}, { timestamps: true })

const Shedule = mongoose.model("Shedule", sheduleSchema)

module.exports = Shedule