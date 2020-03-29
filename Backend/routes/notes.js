const express = require("express");
const router = express.Router();
const {
  getNotes,
  newNote,
  editNote,
  deleteNote
} = require("../controllers/notes");

router.get("/getNotes", getNotes);
router.post("/newNote", newNote);
router.put("/editNote", editNote);
router.delete("/deleteNote", deleteNote);

module.exports = router;
