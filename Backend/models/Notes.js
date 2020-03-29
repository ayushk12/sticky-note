// creating Schema for  notes
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    user: {
      ref: "user",
      type: mongoose.Schema.Types.ObjectId
    },
    file: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Note = mongoose.model("note", noteSchema);
module.exports = Note;
