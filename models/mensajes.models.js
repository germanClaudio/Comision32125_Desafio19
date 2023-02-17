const { Schema, model } = require("mongoose");

// const date = new Date.now().toLocaleString();

const messageSchema = new Schema({
  author: {
            email: {
                    type: String,
                    required: true,
                    maxlength: 100,
                    unique: true,
                    },
            name: {
                    type: String,
                    maxlength: 100,
                    },
            lastName: {
                    type: String,
                    maxlength: 100,
                    },
            age: {
                    type: Number,
                    required: true,
                    },
            alias: {
                    type: String,
                    required: true,
                    maxlength: 50,
                    },
            avatarUrl: {
                    type: String,
                    required: false,
                    },
  },
  text: {
      type: String,
      required: true,
      maxlength: 300,
    },
  date: {
      type: Date,
//       default: date,
    }
});

module.exports = model("Mensajes", messageSchema);