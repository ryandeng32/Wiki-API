const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

// use bodyParser to parse our requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// use public directory to store static files (css, imgs)
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
