const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already Exists"],
        required: true
    },
    email:{
        type: String,
        unique: [true, "Account Already Exists"],
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel