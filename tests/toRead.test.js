//jshint esversion:6
const mysql  = require("mysql");
const toRead = require(__dirname + "/../services/toRead.js");
const databaseProcessor = require(__dirname + '/../services/databaseProcessor.js');
const DB_NAME_PROD = 'booktracker';
const DB_NAME_TEST = 'booktracker_test';

describe('To Read list', () => {

  beforeAll(done => {
    done();
  });

  test('test 1 is 1', () => {
    let var1 = 1;
    let var2 = 1;
    expect(var1).toBe(var2);
  });


  test('test database call works', done => {
    let mysqlConnection = databaseProcessor.setConnection(DB_NAME_PROD);
    let fakeRes = '';
    let fakeRows = '';
    let expectedRowCount = 2;

    databaseProcessor.getResults(mysqlConnection, fakeRes, (fakeRes, fakeRows, result) => {
      expect(result).toBe(expectedRowCount); //Expecting 2 results from the query on the test database
      done();
    });

  });

  test('test nothing on To Read list', done => {
    let mysqlConnection = databaseProcessor.setConnection(DB_NAME_TEST);
    let fakeRes = '';
    let fakeRows = '';
    let expectedRowCount = 0;

    databaseProcessor.getResults(mysqlConnection, fakeRes, (fakeRes, fakeRows, result) => {
      expect(result).toBe(expectedRowCount); //Expecting 2 results from the query on the test database
      done();
    });
  });

  test('test message for empty To Read list', () => {
    let expectedMessage = "No books on your To Read list.";
    let providedRowCount = 0;

    let actualMessage = toRead.calculateWarningMessage(providedRowCount);
    expect(actualMessage).toBe(expectedMessage);
  });

  test('test message for some on read list', () => {
    let expectedMessage = "";
    let providedRowCount = 1;

    let actualMessage = toRead.calculateWarningMessage(providedRowCount);
    expect(actualMessage).toBe(expectedMessage);
  });


  test('test get prod database', () => {
    let mysqlConnection = databaseProcessor.getProductionDatabaseConnection();
    expect(mysqlConnection.config.database).toBe(DB_NAME_PROD);

  });

  test('test getToReadList', () => {
    response = '';
    function testFunction() {
      return true;
    }
    expect(toRead.getToReadList(response, testFunction)).toBe(true);
  });



  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mysql.connection.close();
    done();
  });

});
