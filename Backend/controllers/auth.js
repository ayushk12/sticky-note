const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc         register user
// @route       POST /api/users/register
// @access      public
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = user.generateToken();

  res.status(200).json({
    success: true,
    token
  });
});

// @desc        login user
// @route       POST /api/users/register
// @access      public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and/or password", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorResponse("Inavlid credential", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credential", 401));
  }

  const token = user.generateToken();

  res.status(200).json({
    success: true,
    token
  });
});
