const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const noteRouter = require("./notes");
const { authenticate } = require("../middlewares/auth");

router.use("/users", authRouter);
router.use("/notes", authenticate, noteRouter);

module.exports = router;
