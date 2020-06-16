const firstPrompt = [
    {
        type: "list", 
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Remove Employee",
            "View All Employee Roles",
            "Add Role",
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

const addEmployee = [
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
        choices: ["Find out", "How to", "add all existing roles", "here"],
        name: "employeeRole"
    },
    {
        type: "list", 
        message: "Who is the Employee's manager?",
        choices: ["Find out", "How to", "add all existing managers", "here"],
        name: "employeeManager"
    }
]

const addDepartment = [
    {
        type: "input",
        message: "What is the name of the Department?",
        name: "departmentName",
        validate: function(input) {
            if (input !== "") {
                return true;
            }
            return "Please enter a Department name."
        }
    }
]

const addRole = [
    {
        type: "input",
        message: "What is the name of the Role?",
        name: "roleName",
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

module.exports = {
    firstPrompt: firstPrompt,
    addEmployee: addEmployee,
    addDepartment: addDepartment,
    addRole: addRole
};