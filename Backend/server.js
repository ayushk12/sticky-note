const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const route = require("./routes");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorHandler");
const fileUploads = require("express-fileupload");
const cors = require("cors");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// connect to database
mongoose
  .connect("mongodb://localhost/notes")
  .then(() => console.log("connected to db"))
  .catch(error => console.error("error", error));

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(fileUploads());

// Middleware for handling file
app.use((req, res, next) => {
  if (req.files) {
    console.log("file is there");
    req.body = JSON.parse(req.body.data);
  }
  console.log("body", req.body);
  return next();
});

app.use("/api", route);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
// connect to server
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
