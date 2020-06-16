const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

const prompts = require("./inquirer");


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
    try {
        const userChoice = await inquirer.prompt(prompts.firstPrompt);
        if(userChoice.usersfirstchoice === "View All Employees") {
          viewAllEmployees();
        } else if(userChoice.usersfirstchoice === "Add Employee") {
          addEmployee();
        } else if(userChoice.usersfirstchoice === "Remove Employee") {
          removeEmployee();
        } else if(userChoice.usersfirstchoice === "View All Employee Roles") {
          viewAllEmployeeRoles();
        } else if(userChoice.usersfirstchoice === "View All Employee Roles") {
          viewAllEmployeeRoles();
        } else if(userChoice.usersfirstchoice === "Update Employee Role") {
          updateEmployeeRole();
        } else if(userChoice.usersfirstchoice === "Delete Employee Role") {
          deleteEmployeeRole();
        } else if(userChoice.usersfirstchoice === "View All Departments") {
          viewAllDepartments();
        } else if(userChoice.usersfirstchoice === "Add Department") {
          addDepartment();
        } else if(userChoice.usersfirstchoice === "Delete Department") {
          deleteDepartment();
        } else {
          console.log("Thank you for using the employee management system! Goodbye!");
          connection.end();
        }
    }
    catch(err) {
        console.log(err);
    }
}

async function viewAllEmployees() {
  try {
    connection.query("SELECT * FROM employees", function(err, res) {
      if(err) throw err;
      console.table(res)
      init();
    });
  }
  catch(err) {
    console.log(err);
  }
}

async function addEmployee() {
  try {
    const addEmployee = await inquirer.prompt(prompts.addEmployee);
    init();
  }
  catch(err) {
    console.log(err);
  }
}

async function removeEmployee() {
  try {
    init();
  }
  catch(err) {
    console.log(err);
  }
}

async function viewAllEmployeeRoles() {
  try {
    connection.query("SELECT * FROM roles", function(err, res) {
      if(err) throw err;
      console.table(res)
      init();
    });
  }
  catch(err) {
    console.log(err);
  }
}

async function updateEmployeeRole() {
  try {
    init();
  }
  catch(err) {
    console.log(err);
  }
}

async function deleteEmployeeRole() {
  try {
    init();
  }
  catch(err) {
    console.log(err);
  }
}

async function viewAllDepartments() {
  try {
    connection.query("SELECT * FROM departments", function(err, res) {
      if(err) throw err;
      console.table(res)
      init();
    });
  }
  catch(err) {
    console.log(err);
  }
}

async function addDepartment() {
  try {
    init();
  }
  catch(err) {
    console.log(err);
  }
}

async function deleteDepartment() {
  try {
    init();
  }
  catch(err) {
    console.log(err);
  }
}

