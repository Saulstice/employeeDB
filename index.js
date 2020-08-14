var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection(
    {
        host: "localhost",

        port: 3306,
        // Your username
        user: "root",
        // Your password
        password: "Sallah28",
        database: "employee_DB"
    }
);

connection.connect(function (err) {
    if (err) throw err;
    start();
    // connection.end();
});


function start() {
    inquirer
        .prompt([
            {
                // Open by asking the user what they'd like to do
                type: "list",
                message: "What would you like to do?",
                choices: ["View", "Add", "Update", "Exit"],
                name: "start"
            }
        ]).then(function (data) {
            // If user chooses "View" show them the viewing options
            if (data.start === "View") {
                inquirer
                    .prompt([
                        {
                            type: "list",
                            message: "What would you like to view?",
                            choices:
                                ["View all departments",
                                    "View all roles",
                                    "View all employees"
                                ],
                            name: "views"
                        }
                    ]).then(function (data) {
                        // Call function to show all departments if user chooses that option
                        if (data.views === "View all departments") {
                            allDepartments();
                        }
                        else if (data.views === "View all roles") {
                            allRoles();
                        }
                        else if (data.views === "View all employees") {
                            allEmployees();
                        }

                    })
            }
            else if (data.start === "Add") {
                // If user chooses to add to database
                inquirer
                    .prompt([
                        {
                            type: "list",
                            message: "What would you like to add?",
                            choices:
                                ["Add a department",
                                    "Add a role",
                                    "Add an employee"
                                ],
                            name: "add"
                        }
                    ]).then(function (data) {
                        // Call function to show all departments if user chooses that option
                        if (data.add === "Add a department") {
                            addDepartment();
                        }
                        else if (data.add === "Add a role") {
                            addRole();
                        }
                        else if (data.add === "Add an employee") {
                            addEmployee();
                        }

                    })
            }
            else if (data.start === "Update") {
                //If user chooses to update DB
                inquirer
                    .prompt([
                        {
                            type: "list",
                            message: "What would you like to update?",
                            choices:
                                ["Update a department",
                                    "Update a role",
                                    "Update an employee"
                                ],
                            name: "update"
                        }
                    ]).then(function (data) {
                        // Call update function that user chooses
                        if (data.update === "Update a department") {
                            updateDepartment();
                        }
                        else if (data.update === "Update a role") {
                            updateRole();
                        }
                        else if (data.update === "Update an employee") {
                            updateEmployee();
                        }
                    })
            } 
            else {
                connection.end();
            }
        }
        );
}

// Function for if user chooses to view all departments
function allDepartments() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.table("Departments", res);
        start();
    });
}

// Function for if user chooses to view all roles
function allRoles() {
    //Build SQL query
    var query = "SELECT roles.role_id, roles.title, roles.salary, departments.department_name "
    query += "FROM roles LEFT JOIN departments ON roles.department_id = departments.department_id"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table("Roles", res);
        start();
    });
}

// Function for if user chooses to view all employees
function allEmployees() {
    //Build SQL query
    var query = "SELECT employees.employee_id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.department_name ";
    query += "FROM employees LEFT JOIN roles ON employees.role_id = roles.role_id LEFT JOIN departments ON roles.department_id = departments.department_id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('Employees', res);
        start();
    });
}

// Function to add new employee
function addEmployee() {
    var roles = [];
    //Build SQL query to get all role titles
    var query = "SELECT title FROM roles"
    connection.query(query, function (err, res) {
        if (err) throw err;
        res.forEach(role => {
            roles.push(role.title);
        });
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Enter first name: ",
                    name: "firstName"
                },
                {
                    type: "input",
                    message: "Enter last name: ",
                    name: "lastName"
                },
                {
                    type: "list",
                    message: "What is the employee's role? ",
                    choices: roles,
                    name: "role"
                }
            ]).then(function (data) {
                //Build SQL query to find role_id
                connection.query("SELECT role_id FROM roles WHERE roles.title = ?", [data.role], function (err, res) {
                    if (err) throw err;
                    //SQL query to add employee into DB
                    connection.query("INSERT INTO employees SET ?", {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        role_id: res[0].role_id
                    }, function (err, res) {
                        if (err) throw err;
                        console.log("Employee added.");
                        console.log("------------------------------------------");
                        start();
                    });
                });
            });
    });
}

// Function to add new role
function addRole() {
    var departments = [];
    //Build SQL query to get all department names
    var query = "SELECT department_name FROM departments"
    connection.query(query, function (err, res) {
        if (err) throw err;
        //put all department names into array
        res.forEach(department => {
            departments.push(department.department_name);
        });
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Enter title of the role: ",
                    name: "title"
                },
                {
                    type: "input",
                    message: "Enter salary (integer): ",
                    name: "salary"
                },
                {
                    type: "list",
                    message: "What department is this role in? ",
                    choices: departments,
                    name: "department"
                }
            ]).then(function (data) {
                // Build SQL query to get department id for department user chose
                connection.query("SELECT department_id FROM departments WHERE department_name = ?", [data.department], function (err, res) {
                    if (err) throw err;
                    // SQL query to add new role
                    connection.query("INSERT INTO roles SET ?", {
                        title: data.title,
                        salary: data.salary,
                        department_id: res[0].department_id
                    }, function (err, res) {
                        if (err) throw err;
                        console.log("Role added.");
                        console.log("------------------------------------------");
                        start();
                    });
                });
            });
    });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter name of the department: ",
                name: "name"
            }
        ]).then(function (data) {
            // SQL query to add new department
            connection.query("INSERT INTO departments SET department_name = ?", [data.name], function (err, res) {
                if (err) throw err;
                console.log("Department added.");
                console.log("------------------------------------------");
                start();
            })
        })
}

function updateDepartment() {
    var departments = [];
    //Build SQL query to get department names
    var query = "SELECT department_name FROM departments"
    connection.query(query, function (err, res) {
        if (err) throw err;
        res.forEach(department => {
            departments.push(department.department_name);
        });
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Which department would you like to update? ",
                    choices: departments,
                    name: "oldDepartment"
                },
                {
                    type: "input",
                    message: "What is the updated department name? ",
                    name: "newDepartment"
                }
            ]).then(function (data) {
                //Build SQL query to update department they chose
                connection.query("UPDATE departments SET department_name = ? WHERE department_name = ?",
                    [data.newDepartment, data.oldDepartment], function (err, res) {
                        if (err) throw err;
                        console.log(`${data.oldDepartment} updated to ${data.newDepartment}.`)
                        console.log("------------------------------------------");
                        start();
                    });
            });
    });
}

function updateRole() {
    var roles = [];
    // SQL query to get all role titles
    var query = "SELECT title FROM roles"
    connection.query(query, function (err, res) {
        if (err) throw err;
        res.forEach(role => {
            roles.push(role.title);
        });
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Which role would you like to update? ",
                    choices: roles,
                    name: "oldRole"
                },
                {
                    type: "input",
                    message: "What is the updated role name? ",
                    name: "newRole"
                }
            ]).then(function (data) {
                // SQL query to update department user chose
                connection.query("UPDATE departments SET department_name = ? WHERE department_name = ?",
                    [data.newRole, data.oldRole], function (err, res) {
                        if (err) throw err;
                        console.log(`${data.oldRole} updated to ${data.newRole}.`)
                        console.log("------------------------------------------");
                        start();
                    });
            });
    });
}

function updateEmployee() {
    var employeeNames = [];
    var employees = [];
    // Build SQL query to get employee info
    var query = "SELECT employee_id, first_name, last_name FROM employees"
    connection.query(query, function (err, res) {
        if (err) throw err;
        res.forEach(employee => {
            var fullName = employee.first_name + " " + employee.last_name
            employeeNames.push(fullName);
            employees.push(employee.employee_id);
        });
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Which employee would you like to update? ",
                    choices: employeeNames,
                    name: "thisEmployee"
                },
                {
                    type: "list",
                    message: "What would you like to update? ",
                    choices:
                        ['first_name',
                            "last_name",
                            "role_id",
                            "manager_id"],
                    name: "updateThis"
                },
                {
                    type: "input",
                    message: "What would you like to change it to? ",
                    name: "update"
                }
            ]).then(function (data) {
                var employeeID = "";
                for (let i = 0; i < employeeNames.length; i++) {
                    if (employeeNames[i] === data.thisEmployee) {
                        employeeID = employees[i];
                        parseInt(employeeID);
                    }
                }
                // SQL query to update employee user chose
                connection.query(`UPDATE employees SET ${data.updateThis} = '${data.update}' WHERE employee_id = ${employeeID}`,
                    function (err, res) {
                        if (err) throw err;
                        console.log(`${data.updateThis} updated to ${data.update}.`)
                        console.log("------------------------------------------");
                        start();
                    });
            });
    });
}
