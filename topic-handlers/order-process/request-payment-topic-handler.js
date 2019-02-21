module.exports = {
  subscribe: function (client, customerDB) {
    subscribe(client, customerDB);
  }
}

function subscribe(client, customerDB) {
  client.subscribe('request-payment', async function ({ task, taskService }) {
    const customerNumber = task.variables.get('customerNumber');
    const customer = customerDB.getCustomer(customerNumber);
    if(!customer){
      taskService.handleFailure(task, {
        errorMessage: 'The customer is not in the database...'
      });
      console.error('The customer is not in the database...');
    }
    else {
      const customerName = customerDB.getCustomer(customerNumber).name;
      const paymentAmount = task.variables.get('paymentAmount');
      const orderId = task.businessKey;

      const message = {
        'messageName': 'PaymentRequestedMessage',
        'businessKey': orderId,
        'processVariables': {
          'customerNumber': {
            'value': customerNumber,
            'type': 'String'
          },
          'customerName': {
            'value': customerName,
            'type': 'String'
          },
          'paymentAmount': {
            'value': paymentAmount,
            'type': 'double'
          }
        }
      };

      const camundaAdapter = require('../../adapter/camunda-adapter');
      const process = 'payment-process';

      camundaAdapter.sendMessage(process, message, async function (result) {
        if (result instanceof Error) {
          await taskService.handleFailure(task, {
            errorMessage: 'An issue occurred when sending a message to the ' + process + ' process.',
            errorDetails: result.detail,
            retries: 0
          });
          console.error(result);
        }
        else {
          await taskService.complete(task);
          console.log('Payment cancelled for customer ' + customerNumber);
        }
      });
    }
  });
}