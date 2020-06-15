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

module.exports = firstPrompt;