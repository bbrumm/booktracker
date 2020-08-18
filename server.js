//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysql = require('mysql');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get("/home/", function(request, response) {
  console.log("Home route triggered.");
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
