const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    name: String,
    fees: String,
    fields: [{
        label: { type: String },
        type: { type: String },
    }]
})

const Eventform = mongoose.model("Eventform", eventSchema)

module.exports = Eventform