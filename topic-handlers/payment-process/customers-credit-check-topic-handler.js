module.exports = {
  subscribe: function (client, customerDB) {
    subscribe(client, customerDB);
  }
}

function subscribe(client, customerDB) {
  client.subscribe('customer-credit-check', async function ({ task, taskService }) {
    const customerNumber = task.variables.get('customerNumber');
    const customer = customerDB.getCustomer(customerNumber);

    if (!customer) {
      taskService.handleFailure(task, {
        errorMessage: 'The customer is not in the database...'
      });
      console.error('The customer is not in the database...');
    }
    else {
      const { Variables } = require('camunda-external-task-client-js');
      const variables = new Variables();
      variables.set('credit', customer.credit);
      variables.set('customerName', customer.name);
      taskService.complete(task, variables);
      console.log('Checked customer ' + customerNumber + ' credit...');
    }
  });
}