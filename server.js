// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Jisoo1017!",
  database: "employeetrack_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// This Function will run the inquirer npm package to prompt the user as to what they wish to do
function start() {
  inquirer
    .prompt({
      name: "todo",
      type: "list",
      message: "Would you like to do?",
      choices: ["Add departments", "Add roles", "Add employees", "View departments", "View roles", "View employees", "Update employee roles", "Done"]
    })
    .then(function (answer) {
      // Based on the answer to the initial prompt, a new function will be called on to run
      if (answer.todo === "Add departments") {
        addDepartments();
      }
      else if (answer.todo === "Add roles") {
        addRoles();
      }
      else if (answer.todo === "Add employees") {
        addEmployees();
      }
      else if (answer.todo === "View departments") {
        viewDepartments();
      }
      else if (answer.todo === "View roles") {
        viewRoles();
      }
      else if (answer.todo === "View employees") {
        viewEmployees();
      }
      else if (answer.todo === "Update employee roles") {
        updateUER();
      } else {
        connection.end();
      }
    });
}
// Should the user select to add a Department, the addDepartment function will run promptin the user for more information
function addDepartments() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "depName",
        message: "What is the name of the Department you would like to add?"
      }
    ]).then(function (answer) {
      connection.query("insert into department set ?", { name: answer.depName }, function (error, result) {
        console.log(result)
        start();
      })
    })
}
// Should the user select to add a Role, the addRoles function will run promptin the user for more information
function addRoles() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What is the name of the Role you would like to add?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?"
      },
      {
        type: "input",
        name: "depID",
        message: "What is the ID of the Department that this Role belongs to?"
      }
    ]).then(function (answer) {
      connection.query("INSERT INTO role SET ?", { title: answer.roleName, salary: answer.salary, department_id: answer.depID }, function (error, result) {
        console.log(result)
        start();
      })
    })
}
// Should the user select to add an Employee, the addEmployees function will run promptin the user for more information
function addEmployees() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "emplFirst",
        message: "What is the first name of the Employee you would like to add?"
      },
      {
        type: "input",
        name: "emplLast",
        message: "What is the last name of the Employee you would like to add?"
      },
      {
        type: "input",
        name: "emplRID",
        message: "Please enter the ID for this employee's Role."
      },
      {
        type: "input",
        name: "emplMID",
        message: "Please enter the ID for this employee's manager"
      }
    ]).then(function (answer) {
      connection.query("INSERT INTO employee SET ?", { first_name: answer.emplFirst, last_name: answer.emplLast, role_id: answer.emplRID, manager_id: answer.emplMID }, function (error, result) {
        console.log(result)
        start();
      })
    })
}
// Function will allow you to view all current Departments in a table
function viewDepartments() {
  connection.query("SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;", 
  function (error, result) {
    console.table(result)
    start();
  })
}
// Function will allow you to view all current Roles in a table
function viewRoles() {
  connection.query( "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;", 
  function (error, result) {
    console.table(result)
    start();
  })
}
// Function will allow you to view all current Employees in a table
function viewEmployees() {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
  function(error, result) {
    console.table(result)
    start();
  })
}

// Function to access an employee by their id and change their role_id 
// Prompts the user for the desired info
function updateUER() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter the employee's ID that you would like to update."
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the new role ID that you would like to apply to this employee."
      },
      // Queries the database for the desired info
    ]).then(function (answer) {
      connection.query("update employee set role_id=? where id=?", [
        {
          role_id: answer.role_id
        },
        {
          id: answer.employee_id
        },
        function(err, data) {
          if(err) {
            console.log(data)
          }
        }

      ])
      start();
    })
}

