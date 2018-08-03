require("dotenv").config();
var mysql = require("mysql");
var login = require('./sql');
const Table = require('cli-table');
var questions = require('inquirer');
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



function query() {
    connection.query("SELECT * FROM products", function (err, results) {

        let itemTable = new Table({
            head: ['Item ID', 'Item', 'Price'],
            colWidths: [10, 50, 10]
        });

        if (err) throw err;
        for (let i = 0; i < results.length; i++) {
            itemTable.push([results[i].item_id, results[i].product_name, results[i].price]);
        }
        console.log(itemTable.toString());
        main(results);

    });
}

function main(results) {


    questions.prompt([{
            name: "choice",
            type: "rawlist",
            choices: function () {
                var choiceArray = [];
                results.forEach(element => {
                    choiceArray.push(element.item_id.toString());
                });
                return choiceArray;
            },
            message: "What item would you like to buy?"
        }, {
            name: "quantity",
            type: "input",
            validate: function (input) {
                // Declare function as asynchronous, and save the done callback
                var done = this.async();

                // Do async stuff
                setTimeout(function () {
                    if (isNaN(input)) {
                        // Pass the return value in the done callback
                        done('You need to provide a number');
                        return;
                    }
                    // Pass the return value in the done callback
                    done(null, true);
                }, 3000);
            },
            message: "How many would you like to purchase?"
        }])
        .then(function (answer) {
            if (parseInt(answer.quantity) > results[answer.choice - 1].stock_quantity) {
                console.log("Not enough stock!");
                main(results);
            } else {
                let cost = results[answer.choice - 1].price;
                let quantity = answer.quantity;
                connection.query(`UPDATE products SET stock_quantity = stock_quantity-${answer.quantity} WHERE item_id = ${answer.choice}`, function (err, results) {
                    if (err) throw err;
                    console.log(`Total is: $${cost * quantity}, thanks for shopping with us!`)

                    query();

                });

            }
        })
};

query();