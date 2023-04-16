//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Write down all your important notes here :)";
const aboutContent1 = "This website is built using Node.js and EJS"
const aboutContent2 = "You can use this website for making notes for anything you want.";
const contactContent = "Hello, you can contact me by clicking ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

// Home Route
app.get("/", function(req, res) {
   res.render("home", {homePara: homeStartingContent, posts: posts});
});
// Home Route


// About Route
app.get("/about", function(req, res) {
   res.render("about", {aboutPara1: aboutContent1, aboutPara2: aboutContent2});
});
// About Route


// Contact Route
app.get("/contact", function(req, res) {
   res.render("contact", {contactPara: contactContent});
});
// Contact Route


// Compose Route
app.get("/compose", function(req, res) {
   res.render("compose");
});

app.post("/compose", function(req, res) {
   const post = {
      title: req.body.postTitle,
      content: req.body.postContent
   };
   posts.push(post);
   res.redirect("/")
});
// Compose Route


// Post Routing

app.get("/posts/:postName", function(req, res) {
   const requestedTitle = _.lowerCase(req.params.postName);

   posts.forEach(function(post) {
      const storedTitle = _.lowerCase(post.title);

      if(storedTitle === requestedTitle) {
         res.render("post", {title: post.title, content: post.content});
      }
   });
});

// Post Routing


app.listen("https://viragsavaliya.github.io/Daily-Notes/", function() {
  console.log("Server started on port 24");
});
