module.exports = {
    getCustomer: function(custNumber){
        return getCustomer(custNumber);
    },
    updateCustomer: function(customer){
        updateCustomer(customer);
    }
}

let customers;
let db;
loadData();

function getCustomer(custNumber){
    const qry = {number: custNumber};
    return customers.find(qry)[0];
}

function updateCustomer(customer){
    customers.update(customer);
    db.saveDatabase();
}

function loadData(){
    const loki = require('lokijs');
    db = new loki('./db/customers.json', {
        autoload: true,
        autosaveInterval: 10000});

    customers = db.addCollection('customers');
    const customersJson = require('./base-customers.json');
    customersJson.forEach(element => {
        customers.insert(element);
    });
    db.saveDatabase();
  }
  