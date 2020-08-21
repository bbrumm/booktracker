//jshint esversion:6
const mysql = require('mysql');
let DB_NAME_PROD = 'booktracker';
const TO_READ_LIST_QUERY = "SELECT b.book_id, b.title FROM book b INNER JOIN book_stage bs ON b.book_id = bs.book_id;";
const BOOK_SEARCH_QUERY = "SELECT b.book_id, b.title FROM book b WHERE b.title LIKE ?;";


module.exports.getResults = getResults;

function getResults(dbConnection, response, functionToCallWhenDone) {
    dbConnection.query(TO_READ_LIST_QUERY, function(err, rows, fields) {
    if (!err) {
      //console.log('- 1 The result is: ', rows);

      //const result = 10 + 5;
      //functionToCallWhenDone(result);
      const numberOfRows = rows.length;
      functionToCallWhenDone(response, rows, numberOfRows);
    } else {
      //console.log('** Error while performing query for To Read list: ' + err);
      throw new Error("Error with query");
    }
    dbConnection.end();
  });

}

module.exports.getProductionDatabaseConnection = getProductionDatabaseConnection;

function getProductionDatabaseConnection() {
  return setConnection(DB_NAME_PROD);
}

module.exports.setConnection = setConnection;

function setConnection(databaseName) {
 let connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : 'root',
   database : databaseName,
   port     : 8889
 });
 return connection;
}

module.exports.getBookSearchResults = getBookSearchResults;

function getBookSearchResults(dbConnection, response, searchTerm, functionToCallWhenDone) {
  //console.log("Search term: ("+ searchTerm +")");
  let searchTermWithWildcard = "%" + searchTerm + "%";
  //console.log("Search term with wildcard: ("+ searchTermWithWildcard +")");
  let queryResult = dbConnection.query(BOOK_SEARCH_QUERY, searchTermWithWildcard, function(err, rows, fields) {
      if (!err) {
        //console.log('The result is: ', rows);
        //response.json(rows);
        //showSearchResultList(response, rows);
        const numberOfRows = rows.length;
        functionToCallWhenDone(response, rows, numberOfRows);
      } else {
        console.log('** Error while performing query for Book Search: ' + err);
      }
      dbConnection.end();
    });
    //console.log(queryResult.sql);
}


/*
===============
*/

/*
module.exports.getToReadList = getToReadList;

function getToReadList(request, response) {
  runQueryAndGetResults(function(results) {
    console.log("- 4 Results: ", results);
    showToReadList(response, results);
  });
}
*/
/*
module.exports.setDatabaseName = setDatabaseName;

function setDatabaseName(databaseName) {
  DB_NAME = databaseName;
}
*/
//let queryResult = '';

//Returns an array of books on the to read list.
//This can be mocked by another module, which would use the same function name but connect to a test database, or maybe an array
/*
function runQueryAndGetResults(callback) {
  let connection = setConnection();
  connection.connect();
  //console.log('Query String: ', TO_READ_LIST_QUERY);

  connection.query(TO_READ_LIST_QUERY, function(err, rows, fields) {
      if (!err) {
        //console.log('- 1 The result is: ', rows);
        //queryResult = rows;
        //console.log('- 2 The query result is: ', queryResult);
        callback(rows);
      } else {
        console.log('** Error while performing query for To Read list: ' + err);
      }
      connection.end();
    });
}
*/


//This is the function I can pass a different booksToRead parameter in for testing

/*
function showToReadList(response, booksToRead) {
  console.log("Books to read object:", booksToRead);
  let warningMessage = "";
  if (booksToRead.length == 0) {
      warningMessage = "No books on your To Read list.";
  }

  response.render('toread', {
    resultSet: booksToRead,
    warningMessage: warningMessage
  });
}
*/
