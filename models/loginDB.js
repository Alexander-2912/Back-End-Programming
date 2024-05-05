const {Schema, model} = require('mongoose')

// definisi skema menggunakan Mongoose dalam aplikasi Node.js
const loginSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

// definisi model menggunakan Mongoose dalam aplikasi Node.js
module.exports = model('loginSchema', loginSchema , 'todos')

