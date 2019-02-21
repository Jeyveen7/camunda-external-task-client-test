module.exports = {
  subscribe: function (client, customerDB) {
    subscribe(client, customerDB);
  }
}

function subscribe(client, customerDB) {
  client.subscribe('charge-credit', async function ({ task, taskService }) {

    const customerNumber = task.variables.get('customerNumber');
    console.log('Charging customer ' + customerNumber + ' credit...');

    let paymentAmount = task.variables.get('paymentAmount');
    const customer = customerDB.getCustomer(customerNumber);

    const oldCredit = customer.credit;

    customer.credit = Math.max(0, customer.credit - paymentAmount);
    paymentAmount = Math.max(0, paymentAmount - oldCredit);

    customerDB.updateCustomer(customer);
    console.log('New credit for customer ' + customerNumber + ' is ' + customer.credit);

    const { Variables } = require('camunda-external-task-client-js');
    const variables = new Variables();
    variables.set('credit', customer.credit);
    variables.set('paymentAmount', paymentAmount);

    taskService.complete(task, variables);
    console.log('Charged customer ' + customerNumber + ' credit...');
  });
}