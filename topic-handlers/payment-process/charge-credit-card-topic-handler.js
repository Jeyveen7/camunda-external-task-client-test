module.exports = {
  subscribe: function (client, customerDB) {
    subscribe(client, customerDB);
  }
}

function subscribe(client, customerDB) {
  client.subscribe('charge-credit-card', async function ({ task, taskService }) {

    let customerNumber = task.variables.get('customerNumber');
    let customer = customerDB.getCustomer(customerNumber);

    if (!customer.creditCardNumber) {
      taskService.handleBpmnError(task, 'CreditChargeError', 'Credit card number was not found...');
      console.error('Credit card number was not found...');
    }
    else {
      taskService.complete(task);
      console.log('Charged customer ' + customerNumber + ' credit card...');
    }
  });
}