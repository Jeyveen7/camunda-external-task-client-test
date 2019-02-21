module.exports = {
  sendMessage: function (process, message, callback) {
    sendMessage(process, message, callback);
  }
}

function sendMessage(processName, message, callback) {
  const request = require('request');
  const processHelper = require('../config/process-helper');
  const url = processHelper.findProcess(processName).engineUrl + '/message';

  request.post({
    url,
    json: message
  },
    function (error, response, body) {
      if (error) {
        callback(new Error(error));
      }
      else if (response.statusCode != 204) {
        callback(new Error("An error occurred when sending a message to the process "
          + processName + ". Status code " + response.statusCode));
      }
      else{
        callback(response);
      }
    });
}