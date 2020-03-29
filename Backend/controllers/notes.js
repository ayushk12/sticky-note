const User = require("../models/User");
const Note = require("../models/Notes");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const { fileUpload } = require("../utils/fileUploads");

// @desc        get all notes
// @route       GET /api/notes/getNotes
// @access      private
exports.getNotes = asyncHandler(async (req, res, next) => {
  const notes = await Note.find({ user: req.user });

  return res.status(200).json({
    success: true,
    count: notes.length,
    data: notes
  });
});

// @desc        create a new note
// @route       POST /api/notes/newNote
// @access      private
exports.newNote = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;

  let note = await Note.create({ user: req.user, title, description });

  if (req.files) {
    fileUpload(req.files, req.user, note);
    note = await note.save();
  }

  return res.status(200).json({
    success: true,
    data: note
  });
});

// @desc        edit  a note
// @route       PUT /api/notes/editNote
// @access      private
exports.editNote = asyncHandler(async (req, res, next) => {
  const { id, title, description } = req.body;

  let note = await Note.findById(id);

  if (req.user !== note.user.toString()) {
    return next(new ErrorResponse("Not authorized to update", 401));
  }

  note = await Note.findByIdAndUpdate(id, req.body, { new: true });

  if (req.files) {
    fileUpload(req.files, req.user, note);
    note = await note.save();
  }

  if (!note) {
    return next(new ErrorResponse("No note found to update", 404));
  }

  return res.status(200).json({
    success: true,
    data: note
  });
});

// @desc        delete a note
// @route       POST /api/notes/deleteNote
// @access      private
exports.deleteNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findByIdAndRemove(req.body.id);

  if (!note) {
    return next(new ErrorResponse("No note found to delete", 404));
  }

  return res.status(200).json({
    success: true,
    data: {}
  });
});
