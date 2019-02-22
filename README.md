# Camunda External Task Client Test

## Introduction

This small example was developed throughout Camunda's course called "Camunda and Microservices". It is a simple NodeJS application that interacts with Camunda External Tasks, using the already developed client for Javascript.

### Application Structure

The application is organized as follows:

* main.js: The main Node JS program. It looks into the file "config/processes-config.json" for each process and their configuration for the engine. For each process, the application set the specific topic handlers, which are held inside "topic-handlers/*".
* adapter/camunda-adapter.js: Used to correlate messages in Camunda based on the process name.
* camunda/order-process.bpmn: An order process in BPMN, modeled in Camunda Modeler.
* camunda/order.js: A simple JS file that is referenced in the "order-process.bpmn". It simply generates a random number up to 100.
* camunda/payment-process.bpmn: A payment process in BPMN, modeled in Camunda Modeler.
* camunda/resolve-issue.html: A simple HTML form that is used inside the "payment-process.bpmn" for a human task.
* config/process-helper.js: Used to fetch processes by name.
* config/processes-config.json: The base config file of the application. This file sets the processes that participate in the integration, along with their engines and some basic configuration for the JS clients.
* db/base-customers.json: This file holds a sample of customer records that are inserted into the in memory database "LokiJS".
* db/customer-db.js: Used to create the in memory "LokiJS" database, fetch records by customer number and update customers.
* db/customers.json: The actual "LokiJS" database.
* topic-handlers/*: Holds the topic handlers separated by process. To add a new topic handler for a process, simply put a JS file that follows the same structure as the previous (implementing the "subscribe" method, which expects customerDB and client, which then uses the client to subscribe in a topic).
* topic-handlers/order-process: Topic handlers for the order process.
* topic-handlers/payment-process: Topic handlers fo the payment process.

### Execution

Having node installed, simple run the main application with the following command:

```
node main.js
```

## Disclaimer

I am not a JS developer! As such, you will probably see some bizarre stuff around! :p