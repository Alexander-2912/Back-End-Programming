// pengembangan aplikasi menggunakan Node.js dan MongoDB dengan bantuan Mongoose
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

//  struktur data untuk dokumen-dokumen yang akan disimpan dalam koleksi bernama 'todos'

const todosSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  todos: [
    {
      id: String,
      title: String,
      subtitle: String,
      duedate: String,
      status: Boolean,
      titleBg: String,
      urgent: Boolean,
      description: String,
      dateColor: String,
      category: {
        type: String,
        required: true
      },
    },
  ],
  expense: [
    {
      name: String,
      amount: Number
    }
  ],
  income: [
    {
      name: String,
      amount: Number
    }
  ]
});

// model Mongoose untuk skema todosSchema 
module.exports = registerData = new mongoose.model(
  "todosSchema",
  todosSchema,
  "todos"
);
