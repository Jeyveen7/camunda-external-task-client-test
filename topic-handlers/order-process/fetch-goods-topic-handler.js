module.exports = {
  subscribe: function (client, customerDB) {
    subscribe(client, customerDB);
  }
}

function subscribe(client, customerDB) {
  client.subscribe('fetch-goods', async function ({ task, taskService }) {
    const customerNumber = task.variables.get('customerNumber');
    taskService.complete(task);
    console.log('Goods fetched for customer ' + customerNumber);
  });
}