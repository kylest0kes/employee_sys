const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');


const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "develop1!",
    database: "threewheelEmployee_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    init()
  });

async function init() {
    inquirer.prompt(
        [
            {
                type: "list", 
                message: "What would you like to do?",
                choices: [
                    "View All Employees",
                    "Add Employee",
                    "Remove Employee",
                    "View All Employee Roles",
                    "Update Employee Role",
                    "Delete Employee Role", 
                    "View All Departments",
                    "Add Department",
                    "Delete Department",
                    "Exit Program"
                ],
                name: "usersfirstchoice"
              }, 
        ]
    )
}