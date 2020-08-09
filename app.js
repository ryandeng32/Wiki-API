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

// Set up mongoDB
// connect to database
mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// create article schema - blueprint of the database
const articleSchema = {
  title: String,
  content: String,
};
// create article model - abstract representation of the database
const Article = mongoose.model("Article", articleSchema);

// routing
// GET all articles
app.get("/articles", (req, res) => {
  // read all articles from database
  Article.find((err, foundArticles) => {
    // error check
    if (err) {
      res.send(err);
    } else {
      res.send(foundArticles);
    }
  });
});

// Post an article
app.post("/articles", (req, res) => {
  // save to mongoDB
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
  });
  // save and send back status
  newArticle.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully added a new article");
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
