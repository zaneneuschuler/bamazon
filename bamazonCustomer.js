require("dotenv").config();
var mysql = require("mysql");
var login = require('./sql');
const Table = require('cli-table');
var inquirer = require('inquirer');
var db;

var connection = mysql.createConnection({
    host: login.sql.host,
    port: login.sql.port,

    // Your username
    user: login.sql.userName,

    // Your password
    password: login.sql.pass,
    database: "bamazon"
});


const itemTable = new Table({
    head: ['Item ID', 'Item', 'Price'],
    colWidths: [10, 50, 10]
});


connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    main(results);

});

function main(results) {
    for (let i = 0; i < results.length; i++) {
        itemTable.push([results[i].item_id, results[i].product_name, results[i].price]);
    }
    console.log(itemTable.toString());
    inquirer
        .prompt([{
            name: "choice",
            type: "rawlist",
            choices: function () {
                var choiceArray = [];
                for (let i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].item_id);
                }
                return choiceArray;
            },
            message: "What item would you like to buy?"
        }])
        .then(function (answer) {
            console.log(answer);
        })
};