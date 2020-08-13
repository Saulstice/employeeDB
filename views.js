var mysql = require("mysql");
var start = require("./index")
console.log(start);
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

    // connection.end();
});
// Function for if user chooses to view all departments
function allDepartments() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.log(`ID     Department`);
        console.log(`--     -----------------------`);
        res.forEach(department => {
            console.log(`${department.department_id}       ${department.department_name}`);
        });
        start.start();
    });
}

// Function for if user chooses to view specific department
function oneDepartment() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.log(`ID     Department`);
        console.log(`--     -----------------------`);
        res.forEach(department => {
            console.log(`${department.department_id}       ${department.department_name}`);
        });
        start();
    });
}

module.exports = allDepartments(), oneDepartment;