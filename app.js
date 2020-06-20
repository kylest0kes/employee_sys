const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
const logo = require('./logo');
let roleArr = [];
let managerArr = ["None"];
let departmentsArr = ["None"];
let chosenManager, chosenManagerID, chosenRole, departmentOfRole, roleDepartmentID;

const prompts = require("./prompts");


const connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "develop1!",
    database: "threewheelEmployee_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log(logo)
    init();
  });

async function init() {
    try {
        roleList();
        depatmentList();
        managerList();
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
    let query = "SELECT e.id AS id, e.first_name AS 'first name', e.last_name AS 'last name', ";
    query += "r.title AS role, d.name AS department, r.salary AS salary ";
    query += "FROM employees AS e LEFT JOIN roles AS r ON e.role_id = r.id ";
    query += "LEFT JOIN departments AS d ON d.id = r.department_id ";
    query += "ORDER BY e.id ASC";

    connection.query(query, function(err, res) {
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
    connection.query(
      "SELECT * FROM employees", function(err, res){
        inquirer.prompt(
          [
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "employeeFirstName",
                validate: function(input) {
                    if (input !== "") {
                        return true;
                    }
                    return "Please enter a first name."
                }
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "employeeLastName",
                validate: function(input) {
                    if (input !== "") {
                        return true;
                    }
                    return "Please enter a last name."
                }
            },
            {
                type: "list", 
                message: "What is the Employee's role?",
                choices: roleArr,
                name: "employeeRole"
            },
            {
                type: "list", 
                message: "Who is the Employee's manager?",
                choices: managerArr,
                name: "employeeManager"
            }
      ]
          ).then(function(ans) {
            chosenManager = ans.employeeManager.split(" ");
            for(let i = 0; i < res.length; i++) {
              if(chosenManager[0] === res[i].first_name && chosenManager[1] === res[i].last_name) {
                 chosenManagerID = res[i].id
              } 
            }
            connection.query(
              "SELECT * FROM roles", function(err,res) {
                chosenRole = ans.employeeRole
                for(let i = 0; i < res.length; i++) {
                  if(chosenRole === res[i].title) {
                     chosenRoleID = res[i].id
                  } 
                }
                connection.query(
                  "INSERT INTO employees SET ?", 
                  {
                    first_name: ans.employeeFirstName,
                    last_name: ans.employeeLastName,
                    role_id: chosenRoleID,
                    manager_id: chosenManagerID
                  },
                  function(err, res) {
                    if (err) throw err;
                    console.log("Employee Added")
                    init();
                  }
              
                );
              }
            )        
      })
    })
  }
  catch(err) {
    console.log(err);
  }
}

//take all names from the employees table and put them into a list to choose from
async function removeEmployee() {
  try {
    connection.query(
      "SELECT * FROM employees", function(err, res) {
        inquirer.prompt(
          {
            type: "list", 
            message: "What Employee would you like to remove?",
            choices: managerArr,
            name: "chosenEmployeeToDelete"
          }
        ).then(function(ans) {
          let chosenToDelete = ans.chosenEmployeeToDelete.split(" ");
              
              connection.query(
                "DELETE FROM employees WHERE first_name = ? AND last_name = ?", [chosenToDelete[0], chosenToDelete[1]], function(err, res) {
                  if (err) throw err;
                  console.log("Employee Removed");
                  init();
                }
            )
        
      })
    });
  }
  catch(err) {
    console.log(err);
  }
}

//FUNCTIONS FOR EMPLOYEE ROLES
async function viewAllEmployeeRoles() {
  try {
    connection.query("SELECT * FROM roles LEFT JOIN departments ON roles.department_id = departments.id", function(err, res) {
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
    inquirer.prompt(
      [
        {
          type: "list",
          message: "What Department is this Role in?",
          choices: departmentsArr,
          name: "departmentOfRole"
        },
        {
            type: "input",
            message: "What is the Title of the Role?",
            name: "roleTitle",
            validate: function(input) {
                if (input !== "") {
                    return true;
                }
                return "Please enter a Role name."
            }
        },
        {
            type: "input",
            message: "What is the salary of the Role (no dollar sign)?",
            name: "roleSalary",
            validate: function(input) {
                if (input !== "") {
                    return true;
                }
                return "Please enter a salary."
            }
        }
    ]
    ).then(function(ans) {
      connection.query(
        "SELECT * FROM departments", function(err,res) {
          departmentOfRole = ans.departmentOfRole;
          //console.log(departmentOfRole);
          for(let i = 0; i < res.length; i++) {
            if(departmentOfRole === res[i].name) {
              roleDepartmentID = res[i].id
            } 
          }
          connection.query(
            "INSERT INTO roles SET ?", 
            {
              title: ans.roleTitle,
              salary: ans.roleSalary,
              department_id: roleDepartmentID
            },
            function(err, res) {
              if (err) throw err;
              console.log("Role Added")
              init();
            }
          );
        }
      )}
    );
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
    connection.query(
      "SELECT * FROM roles", function(err, res) {
        inquirer.prompt(
          {
            type: "list", 
            message: "What Role would you like to remove?",
            choices: roleArr,
            name: "chosenRoleToDelete"
          }
        ).then(function(ans) {
          let chosenRole = ans.chosenRoleToDelete
          connection.query(
            "DELETE FROM roles WHERE ?", {title: chosenRole}, function(err, res) {
              if (err) throw err;
              console.log("Role Removed");
              init();
            }
          )
        })
      }
    )  
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
    connection.query(
      "SELECT * FROM departments", function(err, res) {
        inquirer.prompt(
          {
            type: "list", 
            message: "What Department would you like to remove?",
            choices: departmentsArr,
            name: "chosenDeptToDelete"
          }
        ).then(function(ans) {
          let chosenDept = ans.chosenDeptToDelete
          connection.query(
            "DELETE FROM departments WHERE ?", {name: chosenDept}, function(err, res) {
              if (err) throw err;
              console.log("Department Removed");
              init();
            }
          )
        })
      }
    )  
  }
  catch(err) {
    console.log(err);
  }
}

//FUNCTIONS TO GRAB ALL CURRENT DB INFO ON START
function roleList() {
  connection.query(
    "SELECT * FROM roles", function(err, res) {
      if(err) throw err;
      for(let i = 0; i < res.length; i++) {
          roleArr.push(res[i].title);
      }
    }
  )
}

function depatmentList() {
  connection.query(
      "SELECT * FROM departments", function(err, res) {
          if(err) throw err;
          for(let i = 0; i < res.length; i++) {
            departmentsArr.push(res[i].name);
          }
      }
  )
}

function managerList() {
  connection.query(
    "SELECT * FROM employees", function(err, res) {
      if(err) throw err;
      for(let i = 0; i < res.length; i++) {
        managerArr.push(`${res[i].first_name} ${res[i].last_name}`);
      }
    }
  )
}



        