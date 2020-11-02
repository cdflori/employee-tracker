const connection = require("./connection")
const inquirer = require("inquirer")


function main() {
    inquirer.prompt([
        {
            type: "list",
            name: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Employees By Department", "View All Employees By Role", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles"]
        }
    ]).then(answers => {
        if (answers.list === "View All Employees") {
            viewAllEmp();
        }

        else if (answers.list === "View All Employees By Department") {
            viewAllEmpDep();
        }

        else if (answers.list === "View All Employees By Role") {
            viewAllEmpRole();
        }

        else if (answers.list === "Add Employee") {
            addEmployee();
        }

        else if (answers.list === "Add Role") {
            addRole();
        }

        else if (answers.list === "Add Department") {
            addDepartment();
        }

        else if (answers.list === "Remove Employee") {
            removeEmployee();
        }


        else if (answers.list === "Remove Role") {
            removeRole();
        }

        else if (answers.list === "Remove Department") {
            removeDepartment();
        }

        else if (answers.list === "Update Employee Role") {
            updateEmployeeRole();
        }

        // else if (answers.list === "Update Employee Manager") {
        //     updateManager();
        // }

        // else if (answers.list === "View All Roles") {
        //     viewAllRoles();
        // }
        else if (answers.list === "End") {
            connection.end();
        }
    })
}





// View Functions Here

function viewAllEmp() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res)
        main();
    })
};

function viewAllEmpDep() {
    connection.query("SELECT first_name, last_name, department.name FROM employee ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id;", function (err, res) {
        if (err) throw err;
        console.table(res)
        main();
    })
};

function viewAllEmpRole() {
    connection.query("SELECT first_name, last_name, role_id, manager_id, roles.title FROM employee LEFT JOIN roles ON employee.role_id = roles.id;", function (err, res) {
        if (err) throw err;
        console.table(res)
        main();
    })

};

// viewAllRoles();


// Create Functions Here

function addEmployee() {
    inquirer.prompt([
        {
            name: "addEmp",
            type: "confirm",
            message: "Would you like to add an employee?",
            validate: function (value) {
                if (isNaN(value) === false) {

                }
                return false;
            }
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO employee ?", [addEmp], function (err, res) {
            if (err) throw err;
            console.table(res);
            main();
        });
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            name: "addDept",
            type: "confirm",
            message: "Would you like to add a department?",
            validate: function (value) {
                if (isNaN(value) === false) {

                }
                return false;
            }
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO employee ?", [addDept], function (err, res) {
            if (err) throw err;
            console.table(res);
            main();
        });
    });
};

function addRole() {
    inquirer.prompt([
        {
            name: "addNewRole",
            type: "confirm",
            message: "Would you like to add an employee's role?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO employee ?", [addNewRole], function (err, res) {
            if (err) throw err;
            console.table(res);
            main();
        });
    });
};

// Update Functions Here
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "empRole",
            message: "What is the employee's role title?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the employee's salary?"
        },
        {
            type: "input",
            name: "depId",
            message: "What is the employee's id?"
        }
    ]).then(answers => {
        connection.query("UPDATE roles SET ? WHERE",
            {
                empRole: answers.empRole,
                salary: answers.salary,
                depId: answers.depId
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + "employee role updated!\n");

            });
    });
};
// updateManager();


// Delete Functions Here

function removeEmployee() {
    inquirer.prompt([
        {
            type: "number",
            name: "id",
            message: "Enter employee ID?"
        }
    ]).then(answers => {
        connection.query("DELETE FROM employee WHERE ?",
            {
                id: answers.id
            }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + "Employee deleted!\n");
                main(;)
            })
    })
};
function removeRole(){
    inquirer.prompt([
        {
            type: "number",
            name: "id",
            message: "Enter role ID?"
        }
    ]).then(answers => {
        connection.query("DELETE FROM employee WHERE ?",
            {
                id: answers.id
            }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + "Role deleted!\n");
                main();

            });
    });
};

function removeDepartment(){
    inquirer.prompt([
        {
            type: "number",
            name: "id",
            message: "Enter department ID?"
        }
    ]).then(answers => {
        connection.query("DELETE FROM department WHERE ?",
            {
                id: answers.id
            }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + "Department deleted!\n");
                main();
            });
    });
};




