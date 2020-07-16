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
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
  
  // function which prompts the user for what action they should take
  function start() {
    inquirer
      .prompt({
        name: "todo",
        type: "list",
        message: "Would you like to do?",
        choices: ["Add departments", "Add roles", "Add employees", "View departments", "View roles", "View employees", "Update employee roles", "Done"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.todo === "Add departments") {
          addDepartments();
        }
        else if(answer.todo === "Add roles") {
          addRoles();
        }
        else if(answer.todo === "Add employees") {
            addEmployees();
          } 
        else if(answer.todo === "View departments") {
            viewDepartments();
          } 
        else if(answer.todo === "View roles") {
            viewRoles();
          } 
        else if(answer.todo === "View employees") {
            viewEmployees();
          } 
        else if(answer.todo === "Update employee roles") {
            updateUER();
          }  else{
          connection.end();
        }
      });
  }

  function addDepartments() {
      inquirer
      .prompt([
          {
              type: "input",
              name: "depName",
              message: "What is the name of the Department you would like to add?"
          }
      ]).then(function(answer) {
          connection.query("insert into department set ?", {name: answer.depName}, function(error, result) {
            console.log(result)
            start();
          })
      })
  }

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
      ]).then(function(answer) {
          connection.query("INSERT INTO role SET ?", {title: answer.roleName, salary: answer.salary, department_id: answer.depID}, function(error, result) {
              console.log(result)
            // connection.query("insert into role set ?", {salary: answer.salary}, function(err, data) {
            //     console.log(data)
                start();
          })
      })
  }

  function viewDepartments() {
      connection.query("select name from department", function(error, result) {
          console.table(result)
          start();
      }) 
  }

  function updateUER() {
      inquirer
      .prompt([
          {

          }
      ]).then(function(answer) {
          connection.query("update employee set ? where ?", [
              {
                  role_id: answer.role_id
              },
              {
                  id: answer.employee_id
              }
          ])
      })
  }