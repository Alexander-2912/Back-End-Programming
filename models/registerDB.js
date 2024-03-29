const {Schema, model} = require('mongoose')
const mongoose = require('mongoose')

const registerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
})

// module.exports = model('register', registerSchema)

module.exports = registerData = new mongoose.model('register', registerSchema)

