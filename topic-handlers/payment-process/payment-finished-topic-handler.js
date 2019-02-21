module.exports = {
  subscribe: function (client, customerDB) {
    subscribe(client, customerDB);
  }
}

function subscribe(client, customerDB) {
  client.subscribe('payment-finished', async function ({ task, taskService }) {
    const customerNumber = task.variables.get('customerNumber');

    const message = {
      'messageName': 'PaymentFinishedMessage',
      'businessKey': task.businessKey
    };

    const camundaAdapter = require('../../adapter/camunda-adapter');
    const process = 'order-process';

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
        console.log('Payment finished for customer ' + customerNumber);
      }
    });
  });
}