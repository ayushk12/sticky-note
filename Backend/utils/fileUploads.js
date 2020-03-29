const path = require("path");
const ErrorResponse = require("../utils/errorResponse");

exports.fileUpload = async (files, user, note) => {
  const file = files.file;

  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse("please uplaod an image", 400));
  }

  file.name = `photo_${user}${path.parse(file.name).ext}`;

  file.mv(`./public/uploads/${file.name}`, async err => {
    if (err) {
      console.err(err);
    }
  });

  note.file = file.name;
};
