// The Packages Required for this application's logic
const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");

// Call for the main function, as defined below, which initates the application
init();

// The init function first displays the application's logo text before loading the main prompts for the user 
// through which they can manage their employee database
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  loadMainPrompts();
}

function loadMainPrompts() {
  // The main inquirer prompts for the user to manage their employee database via various other functons as defined below
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Hello! What funtion would you like to perform?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER"
        },
        {
          name: "Add a New Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Remove an Employee",
          value: "REMOVE_EMPLOYEE"
        },
        {
          name: "Update an Employee's Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "Update an Employee's Manager",
          value: "UPDATE_EMPLOYEE_MANAGER"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add a New Role",
          value: "ADD_ROLE"
        },
        {
          name: "Remove a Role",
          value: "REMOVE_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add a New Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Remove a Department",
          value: "REMOVE_DEPARTMENT"
        },
        {
          name: "View the Total Utilized Budget By Department",
          value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT"
        },
        {
          name: "Quit the Employee Manager",
          value: "QUIT"
        }
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    // Based on which choice the user makes, the application calls the corresponding function
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEmployeesByDepartment();
        break;
      case "VIEW_EMPLOYEES_BY_MANAGER":
        viewEmployeesByManager();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "REMOVE_EMPLOYEE":
        removeEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "UPDATE_EMPLOYEE_MANAGER":
        updateEmployeeManager();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "REMOVE_DEPARTMENT":
        removeDepartment();
        break;
      case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
        viewUtilizedBudgetByDepartment();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "REMOVE_ROLE":
        removeRole();
        break;
      default:
        quit();
    }
  }
  )
}

// View All Employees in the Database
function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadMainPrompts());
}

// View all Employees that belong to a Particular Department of the User's Choice
function viewEmployeesByDepartment() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Which department would you like to see employees for?",
          choices: departmentChoices
        }
      ])
        .then(res => db.findAllEmployeesByDepartment(res.departmentId))
        .then(([rows]) => {
          let employees = rows;
          console.log("\n");
          console.table(employees);
        })
        .then(() => loadMainPrompts())
    });
}

// View all Employees that Report to a Specific Manager of the User's Choice
function viewEmployeesByManager() {
  db.findAllEmployees()
    .then(([rows]) => {
      let managers = rows;
      const managerChoices = managers.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "managerId",
          message: "Which manager's employees would you like to view?",
          choices: managerChoices
        }
      ])
        .then(res => db.findAllEmployeesByManager(res.managerId))
        .then(([rows]) => {
          let employees = rows;
          console.log("\n");
          if (employees.length === 0) {
            console.log("The selected manager has no employees underneath them!");
          } else {
            console.table(employees);
          }
        })
        .then(() => loadMainPrompts())
    });
}

// Delete an employee of the User's Choice from the Database
function removeEmployee() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to remove from the database?",
          choices: employeeChoices
        }
      ])
        .then(res => db.removeEmployee(res.employeeId))
        .then(() => console.log("You succesfully removed that employee from the database"))
        .then(() => loadMainPrompts())
    })
}

// Update an employee's role to another of the User's Choice
function updateEmployeeRole() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's role do you want to update?",
          choices: employeeChoices
        }
      ])
        .then(res => {
          let employeeId = res.employeeId;
          db.findAllRoles()
            .then(([rows]) => {
              let roles = rows;
              const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
              }));

              prompt([
                {
                  type: "list",
                  name: "roleId",
                  message: "Which role do you want to assign the selected employee in lieu of their old one?",
                  choices: roleChoices
                }
              ])
                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                .then(() => console.log("You succesfully updated the employee's role"))
                .then(() => loadMainPrompts())
            });
        });
    })
}

// Update an employee's manager to another of the User's Choice
function updateEmployeeManager() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's manager do you want to update?",
          choices: employeeChoices
        }
      ])
        .then(res => {
          let employeeId = res.employeeId
          db.findAllPossibleManagers(employeeId)
            .then(([rows]) => {
              let managers = rows;
              const managerChoices = managers.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
              }));

              prompt([
                {
                  type: "list",
                  name: "managerId",
                  message:
                    "Which employee do you want to set as manager for the selected employee?",
                  choices: managerChoices
                }
              ])
                .then(res => db.updateEmployeeManager(employeeId, res.managerId))
                .then(() => console.log("You succefuly updated that employee's manager"))
                .then(() => loadMainPrompts())
            })
        })
    })
}

// View all roles in the database
function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => loadMainPrompts());
}

// Add a role to the database
function addRole() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      prompt([
        {
          name: "title",
          message: "What is the name of the role you would like to add?"
        },
        {
          name: "salary",
          message: "What is the salary of the role you would like to add?"
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does the role you would like to add belong to?",
          choices: departmentChoices
        }
      ])
        .then(role => {
          db.createRole(role)
            .then(() => console.log(`Succesfully Added ${role.title} to the database as a new role!`))
            .then(() => loadMainPrompts())
        })
    })
}

// Delete a role from the database
function removeRole() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));

      prompt([
        {
          type: "list",
          name: "roleId",
          message:
            "Which role do you want to remove from the database? (WARNING: This will also remove employees that have this role!)",
          choices: roleChoices
        }
      ])
        .then(res => db.removeRole(res.roleId))
        .then(() => console.log("Succefully removed this role from the database"))
        .then(() => loadMainPrompts())
    })
}

// View all deparments in the database
function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => loadMainPrompts());
}

// Add a department to the database
function addDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the name of the department you would like to add?"
    }
  ])
    .then(res => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`Succesfully added ${name.name} to the database as a new department`))
        .then(() => loadMainPrompts())
    })
}

// Delete a department from the database
function removeDepartment() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      prompt({
        type: "list",
        name: "departmentId",
        message:
          "Which department would you like to remove from the database? (WARNING: This will also remove associated roles and employees in this department!)",
        choices: departmentChoices
      })
        .then(res => db.removeDepartment(res.departmentId))
        .then(() => console.log(`Succesfully removed this department from the database`))
        .then(() => loadMainPrompts())
    })
}

// View all departments and show their total utilized department budget
function viewUtilizedBudgetByDepartment() {
  db.viewDepartmentBudgets()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => loadMainPrompts());
}

// Add an employee to the database
function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "What is the first name of the employee that you'd like to add to the database?"
    },
    {
      name: "last_name",
      message: "What is the last name of the employee that you'd like to add to the database?"
    }
  ])
    .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;

      db.findAllRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));

          prompt({
            type: "list",
            name: "roleId",
            message: "What is the role of the employee that you'd like to add to the database?",
            choices: roleChoices
          })
            .then(res => {
              let roleId = res.roleId;

              db.findAllEmployees()
                .then(([rows]) => {
                  let employees = rows;
                  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                  }));

                  managerChoices.unshift({ name: "None", value: null });

                  prompt({
                    type: "list",
                    name: "managerId",
                    message: "Who is the manager of the employee that you'd like to add to the database?",
                    choices: managerChoices
                  })
                    .then(res => {
                      let employee = {
                        manager_id: res.managerId,
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName
                      }

                      db.createEmployee(employee);
                    })
                    .then(() => console.log(
                      `Succesfully added ${firstName} ${lastName} to the database!`
                    ))
                    .then(() => loadMainPrompts())
                })
            })
        })
    })
}

// Close the application
function quit() {
  console.log("Goodbye! Thank you for using this Employee Manager!");
  process.exit();
}
