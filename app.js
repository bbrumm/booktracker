//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const toRead = require(__dirname + "/services/toRead.js");
const bookSearch = require(__dirname + "/services/bookSearch.js");
//const databaseProcessor = require(__dirname + '/services/databaseProcessor.js');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get("/home/", function(request, response) {
  console.log("Home route triggered.");
  response.render('index');
});

app.get("/toread/", function(request, response) {
  toRead.getToReadList(response, renderToReadPage);
});

function renderToReadPage(response, rows) {
  let warningMessage = toRead.calculateWarningMessage(rows.length);
  response.render('toread', {
    resultSet: rows,
    warningMessage: warningMessage
  });
}

app.post("/search/", function(request, response) {
  let searchTerm = request.body.searchBox;
  bookSearch.searchForBookByTitle(response, searchTerm, renderSearchResultsPage);
});


function renderSearchResultsPage(response, rows) {
  let noResultsMessage = bookSearch.calculateNoResultsMessage(rows.length);
  response.render('searchResults', {
    resultSet: rows,
    noResultsMessage: noResultsMessage
  });
}


app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
