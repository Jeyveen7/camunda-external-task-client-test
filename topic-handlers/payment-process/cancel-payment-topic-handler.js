module.exports = {
  subscribe: function (client, customerDB) {
    subscribe(client, customerDB);
  }
}

function subscribe(client, customerDB) {
  client.subscribe('cancel-payment', async function ({ task, taskService }) {

    var customerNumber = task.variables.get('customerNumber');
    var customer = customerDB.getCustomer(customerNumber);
    var paymentAmount = task.variables.get('paymentAmount');

    customer.credit = customer.credit + paymentAmount;

    customerDB.updateCustomer(customer);

    await taskService.complete(task);
    console.log('Payment cancelled for customer ' + customerNumber);
  });
}