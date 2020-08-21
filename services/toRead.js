//jshint esversion:6
const databaseProcessor = require(__dirname + '/databaseProcessor.js');



module.exports.getToReadList = function(response, functionToCallWhenDone) {
  dbConnection = databaseProcessor.getProductionDatabaseConnection();
  databaseProcessor.getResults(dbConnection, response, functionToCallWhenDone);
  return true;
};

module.exports.calculateWarningMessage = calculateWarningMessage;

function calculateWarningMessage(numberOfRows) {
  let warningMessage = "";
  if (numberOfRows == 0) {
      warningMessage = "No books on your To Read list.";
  }
  return warningMessage;
}
