//jshint esversion:6
const mysql  = require("mysql");
const bookSearch = require(__dirname + "/../services/bookSearch.js");
const databaseProcessor = require(__dirname + '/../services/databaseProcessor.js');
const DB_NAME_PROD = 'booktracker';
const DB_NAME_TEST = 'booktracker_test';

describe('Book Search', () => {

  beforeAll(done => {
    done();
  });

  test('test database call works', done => {
    let mysqlConnection = databaseProcessor.setConnection(DB_NAME_PROD);
    let fakeRes = '';
    let fakeRows = '';
    let emptySearchTerm = '';

    databaseProcessor.getBookSearchResults(mysqlConnection, fakeRes, emptySearchTerm, (fakeRes, fakeRows, result) => {
      expect(result).toBeGreaterThan(0);
      done();
    });
  });

  test('test search for single letter', done => {
    let mysqlConnection = databaseProcessor.setConnection(DB_NAME_PROD);
    let fakeRes = '';
    let fakeRows = '';
    let searchTerm = 'e';

    databaseProcessor.getBookSearchResults(mysqlConnection, fakeRes, searchTerm, (fakeRes, fakeRows, result) => {
      expect(result).toBeGreaterThan(0);
      done();
    });
  });

  test('test search for stone', done => {
    let mysqlConnection = databaseProcessor.setConnection(DB_NAME_PROD);
    let response = '';
    let rows = '';
    let searchTerm = 'stone';

    databaseProcessor.getBookSearchResults(mysqlConnection, response, searchTerm, (response, rows, result) => {
      //console.log("Rows: ", rows);
      let rowFound = findBookTitleInSearchResults('Harry Potter and the Philosopher\'s Stone', rows);
      expect(rowFound).toBe(true);
      done();
    });
  });

  test('test search for rich dad', done => {
    let mysqlConnection = databaseProcessor.setConnection(DB_NAME_PROD);
    let response = '';
    let rows = '';
    let searchTerm = 'rich dad';

    databaseProcessor.getBookSearchResults(mysqlConnection, response, searchTerm, (response, rows, result) => {
      //console.log("Rows: ", rows);
      let rowFound = findBookTitleInSearchResults('Rich Dad Poor Dad', rows);
      expect(rowFound).toBe(true);
      done();
    });
  });

  test('test search for rich dad upper case', done => {
    let mysqlConnection = databaseProcessor.setConnection(DB_NAME_PROD);
    let response = '';
    let rows = '';
    let searchTerm = 'RICH DAD';

    databaseProcessor.getBookSearchResults(mysqlConnection, response, searchTerm, (response, rows, result) => {
      //console.log("Rows: ", rows);
      let rowFound = findBookTitleInSearchResults('Rich Dad Poor Dad', rows);
      expect(rowFound).toBe(true);
      done();
    });
  });

  test('test search for full title', done => {
    let mysqlConnection = databaseProcessor.setConnection(DB_NAME_PROD);
    let response = '';
    let rows = '';
    let searchTerm = 'Lord of the Rings: The Fellowship of the Ring';

    databaseProcessor.getBookSearchResults(mysqlConnection, response, searchTerm, (response, rows, result) => {
      //console.log("Rows: ", rows);
      let rowFound = findBookTitleInSearchResults('Lord of the Rings: The Fellowship of the Ring', rows);
      expect(rowFound).toBe(true);
      done();
    });
  });

  test('test message for no results found', () => {
    let expectedMessage = "No results found.";
    let providedRowCount = 0;

    let actualMessage = bookSearch.calculateNoResultsMessage(providedRowCount);
    expect(actualMessage).toBe(expectedMessage);
  });

  test('test message for some results found', () => {
    let expectedMessage = "";
    let providedRowCount = 3;

    let actualMessage = bookSearch.calculateNoResultsMessage(providedRowCount);
    expect(actualMessage).toBe(expectedMessage);
  });

  test('test searchForBookByTitle', () => {
    response = '';
    searchTeam = '';
    function testFunction() {
      return true;
    }
    expect(bookSearch.searchForBookByTitle(response, searchTeam, testFunction)).toBe(true);
  });

  test('test search empty value', done => {
    let mysqlConnection = databaseProcessor.setConnection(DB_NAME_PROD);
    let response = '';
    let rows = '';
    let searchTerm = '';
    let expectedNumberOfRows = '';
    mysqlConnection.query('SELECT COUNT(*) AS rowcount FROM book', function(err, rows, fields) {
      expectedNumberOfRows = rows[0].rowcount;
    });


    databaseProcessor.getBookSearchResults(mysqlConnection, response, searchTerm, (response, rows, result) => {
      //console.log("Rows: ", rows);
      let actualNumberOfRows = rows.length;
      expect(actualNumberOfRows).toBe(expectedNumberOfRows);
      done();
    });
  });


  function findBookTitleInSearchResults(bookTitle, searchRows) {
    for (var i=0; i < searchRows.length; i++) {
        if (searchRows[i].title === bookTitle) {
            return true;
        }
    }
    return false;
  }

  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mysql.connection.close();
    done();
  });

});
