const mysql = require("mysql");
const inquirer = require("inquirer");

// const emptrack = require("./emptrack_db")


const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Csd67bj34z!",
    database: "emptrack_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
      main();
});

const selection = [

    {
        type: "list",
        name: "selection",
        message: "What would you like to to?",
        choices: [
            "Add new employee",
            "View all employees",
            "View employees by department",
            "Update employee role",
            "View all roles",
            "Add role",
            "View all departments",
            "Add department",
            "Exit"
        ]
    }
]


async function main() {
    const results = await inquirer.prompt(selection);
    switch (results.selection) {
        case 'Add new employee':
            addEmployee();
            break;
        case 'View all employees':
            viewAllEmployees();
            break;
        case 'View all employees by department':
            viewByDep();
            break;
        case 'View all roles':
            viewAllRoles();
            break;
        case 'Add new role':
            addNewRole();
            break;
        case 'View all departments':
            viewAllDep();
            break;
        case 'Add department':
            addDepartment();
            break;
        default:
            connection.end();
            break;
    }
}


function addEmployee() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "input",
                name: "firstname",
                message: "Enter in the employee's first name."
            },
            {
                type: "input",
                name: "lastname",
                message: "Enter in the employee's last name"
            },
            {
                name: "choice",
                type: "rawlist",
                choices: function () {
                    let selectArray = [];
                    for (var i = 0; i < res.length; i++) {
                        selectArray.push(res[i].title);
                    }
                    return selectArray;
                },
                message: "What is the employee's role?"
            },
            {
                type: "input",
                name: "employmanager",
                message: "Enter the employee's manager"
            }
        ]).then(function (res) {

            for (let i = 0; i < res.length; i++) {
                if (res[i].title === res.choice) {
                    res.role_id = res[i].id;
                }
            }

            let query = "INSERT INTO employee SET ?"
            const VALUES = {
                first_name: res.firstname,
                last_name: res.lastname,
                role_id: res.role_id
            }
            connection.query(query, VALUES, function (err) {
                if (err) throw err;
                console.table("Success, employee added!")
                main();
            })

        })
    })
}

function viewAllEmployees() {
    connection.query(
        "SELECT first_name AS first_name AS FirstName, last_name AS LastName, role.title AS Role, role.salary AS Salary, department.name AS Department FROM employee  INNER JOIN department   ON   department.id = employee.role_id   LEFT JOIN  role   ON  role.id = employee.role_id ", function (err, res) {
            console.table(res);
            if (err) throw err;
            main();
        })
}

function viewByDep() {
    connection.query("SELECT name AS Departments FROM department ", function (err, res) {
        console.table(res);
        if (err) throw err;
        main();
    })

}

function viewAllRoles() {
    connection.query("SELECT title AS Role FROM role", function (err, res) {
        console.table(res);
        if (err) throw err;
        main();
    })
}

function addDepartment() {
    inquirer.prompt({
        name: "addDep",
        type: "input",
        message: "Select the Department you would like to add."
    }).then (function (res){

        let query = "INSERT INTO department SET?"
        console.log(query)
        let queryDep
    })
}
// module.exports = connection