const connection = require("./connection")
const inquirer = require("inquirer")


function main() {
    inquirer.prompt([
        {
            type: "list",
            name: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles"]
        }
    ]).then(answers => {
        if (answers.list === "View All Employees") {
            viewAllEmp();
        }

        else if (answers.list === "View All Employees By Department") {
            viewAllEmpDep();
        }

        else if (answers.list === "View All Employees By Manager") {
            viewAllEmpMan();
        }

        else if (answers.list === "Add Employee") {
            addEmployee();
        }

        else if (answers.list === "Remove Employee") {
            removeEmployee();
        }

        else if (answers.list === "Add Role") {
            addRole();
        }

        else if (answers.list === "Remove Role") {
            removeRole();
        }

        else if (answers.list === "Add Department") {
            addDepartment();
        }

        else if (answers.list === "Remove Department") {
            removeDepartment();
        }

        else if (answers.list === "Update Employee Role") {
            updateEmployeeRole();
        }

        else if (answers.list === "Update Employee Manager") {
            updateManager();
        }

        else if (answers.list === "View All Roles") {
            viewAllRoles();
        }
        else if (answers.list === "End") {
            connection.end();
        }
    })
}





// View Functions Here

viewAllEmp();

viewAllEmpDep();

viewAllEmpMan();

viewAllRoles();


// Create Functions Here

addEmployee();
addRole();
addDepartment();


// Update Functions Here
updateEmployeeRole();
updateManager();


// Delete Functions Here

removeEmployee();
removeRole();
removeDepartment();




