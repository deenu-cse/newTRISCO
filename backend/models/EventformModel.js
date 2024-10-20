const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    name: String,
    fees: String,
    fields: [{
        label: { type: String },
        type: { type: String },
    }],
    numMembers: { type: Number, default: null }
})

const Eventform = mongoose.model("Eventform", eventSchema)

module.exports = Eventform