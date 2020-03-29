const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.authenticate = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }

  if (!token) {
    return next(
      new ErrorResponse("not authorization to access this route", 401)
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    req.user = user._id.toString();

    next();
  } catch (err) {
    return next(
      new ErrorResponse("not authorization to access this route", 401)
    );
  }
});
