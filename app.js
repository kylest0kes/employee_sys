const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
const logo = require('./logo');

const prompts = require("./inquirer");


const connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "develop1!",
    database: "threewheelEmployee_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    console.log(logo)
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
        } else if(userChoice.usersfirstchoice === "Add Employee Role") {
          addEmployeeRole();
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

//FUNCTIONS FOR EMPLOYEES
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
    connection.query(
      "INSERT INTO employees SET ?", 
      {
        first_name: addEmployee.employeeFirstName,
        last_name: addEmployee.employeeLastName
      },
      function(err, res) {
        if (err) throw err;
        console.log("Employee")
        init();
      }
    )
  }
  catch(err) {
    console.log(err);
  }
}

//take all names from the employees table and put them into a list to choose from
async function removeEmployee() {
  try {
    init();
  }
  catch(err) {
    console.log(err);
  }
}

//FUNCTIONS FOR EMPLOYEE ROLES
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

async function addEmployeeRole() {
  try {
    const addRole = await inquirer.prompt(prompts.addRole);
    connection.query(
      "INSERT INTO roles SET ?", 
      {
        name: addRole.roleName,
        salary: addRole.roleSalary
      },
      function(err, res) {
        if (err) throw err;
        console.log("Employee")
        init();
      }
    )
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

//take all names from the roles table and put them into a list to choose from
async function deleteEmployeeRole() {
  try {
    init();
  }
  catch(err) {
    console.log(err);
  }
}

//FUNCTIONS FOR DEPARTMENTS
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
    const addDepartment = await inquirer.prompt(prompts.addDepartment);
    connection.query(
      "INSERT INTO departments SET ?", 
      {
        name: addDepartment.departmentName
      },
      function(err, res) {
        if (err) throw err;
        console.log("Department Created")
        init();
      }
    )
  }
  catch(err) {
    console.log(err);
  }
}

//take all names from the departments table and put them into a list to choose from
async function deleteDepartment() {
  try {
    init();
  }
  catch(err) {
    console.log(err);
  }
}

