//jshint esversion:6
const databaseProcessor = require(__dirname + '/databaseProcessor.js');

module.exports.searchForBookByTitle = searchForBookByTitle;

function searchForBookByTitle(response, searchTerm, functionToCallWhenDone) {

  dbConnection = databaseProcessor.getProductionDatabaseConnection();
  databaseProcessor.getBookSearchResults(dbConnection, response, searchTerm, functionToCallWhenDone);
  return true;
}

module.exports.calculateNoResultsMessage = calculateNoResultsMessage;

function calculateNoResultsMessage(numberOfRows) {
  let noResultsMessage = "";
  if (numberOfRows == 0) {
      noResultsMessage = "No results found.";
  }
  return noResultsMessage;
}


//This is the function I can pass a different booksToRead parameter in for testing
//Maybe I can use an array (or collection) to hold all of the Book details.
//And this can be used to test against.
/*
function showSearchResultList(response, bookSearchResults) {
  console.log("Book search results:", bookSearchResults);
  let warningMessage = "No results found.";
  if (bookSearchResults.length > 0) {
    response.render('searchResults', {
      resultSet: bookSearchResults,
    });
  } else {
    //No books found. What do we do?
    response.render('searchResults', {
      resultSet: bookSearchResults,
      warningMessage: warningMessage
    });
  }
}*/
