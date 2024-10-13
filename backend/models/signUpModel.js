const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gkv: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    rollNo: {
        type: Number,
        required: function () { return this.gkv === 'Yes'; }
    },
    idCard: {
        type: String,
        required: function () { return this.gkv === 'Yes'; }
    },
    collegeName: {
        type: String,
        required: function () { return this.gkv === 'No'; }
    },
    studentId: {  
        type: String,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

userSchema.methods.generatToken = async function () {
    try {
        return jwt.sign({
            userid: this._id.toString(),
            email: this.email,
            studentId: this.studentId
        },
            "Gurukul_Kangri", {
            expiresIn: "1d",
        })
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User