const { Client } = require('camunda-external-task-client-js');
const { logger } = require('camunda-external-task-client-js');
const processes = require('./config/processes-config.json');
const customerDB = require('./db/customer-db.js');

processes.forEach(process => {

  const config = {
    baseUrl: process.engineUrl,
    workerId: process.clientConfig.workerId,
    maxTasks: process.clientConfig.maxTasks,
    asyncResponseTimeout: process.clientConfig.asyncResponseTimeout,
    use : logger
  };

  const client = new Client(config);

  const subFolder = './topic-handlers';
  const fs = require('fs');
  const folder = subFolder+'/'+process.name;

  fs.readdir(folder, (err, files) => {
    files.forEach(file => {
      const sub = require(folder+'/'+file);
      sub.subscribe(client, customerDB);
    });
  });
});