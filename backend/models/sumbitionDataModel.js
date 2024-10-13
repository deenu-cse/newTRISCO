const mongoose = require("mongoose")

const submissionSchema = new mongoose.Schema({
    Event: String,
    submissionData: {
        type: Object,
        required: true
    },
    studentId: {
        type: String,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    }
}, { timestamps: true })

const Submission = mongoose.model("Submission", submissionSchema)
module.exports = Submission;