module.exports = {
  subscribe: function (client, customerDB) {
    subscribe(client, customerDB);
  }
}

function subscribe(client, customerDB) {
  client.subscribe('ship-goods', async function ({ task, taskService }) {
    const customerNumber = task.variables.get('customerNumber');
    await taskService.complete(task);
    console.log('Goods shipped to customer ' + customerNumber);
  });
}