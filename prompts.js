const firstPrompt = [
    {
        type: "list", 
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Remove Employee",
            "View All Employee Roles",
            "Add Employee Role",
            "Delete Employee Role", 
            "View All Departments",
            "Add Department",
            "Delete Department",
            "Exit Program"
        ],
        name: "usersfirstchoice"
      }, 
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

module.exports = {
    firstPrompt: firstPrompt,
    addDepartment: addDepartment
};