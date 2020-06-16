const firstPrompt = [
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

module.exports = {
    firstPrompt: firstPrompt,
    addEmployee: addEmployee
};