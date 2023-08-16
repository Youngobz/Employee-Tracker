const inquirer = require('inquirer');
const figlet = require("figlet");
const question = require('./constants/main_question.json');
const { viewDepartments, addDepartment } = require('./lib/department');
const { viewRoles, addRole } = require('./lib/role');
const { viewEmployees, addEmployee, updateEmployee } = require('./lib/employee');
require('dotenv').config();

function mainMenu(){
  console.log('\n');
  return inquirer.prompt(question);
};

function display(){
  console.clear();
  figlet("Employee Manager", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
    main();
  });
}

async function main(){
  const { mMenu } = await mainMenu();
  if(mMenu ===  "View All Employees"){
    await viewEmployees();
  }else if(mMenu === 'Add Employee'){
    await addEmployee();
  }else if(mMenu === 'Update Employee Role'){
    await updateEmployee();
  }else if(mMenu === 'View All Roles'){
    await viewRoles();
  }else if(mMenu === 'Add New Role'){
    await addRole();
  }else if(mMenu === 'View All Departments'){
    await await viewDepartments();
  }else if(mMenu === 'Add New Department'){
    await addDepartment();
    display();
  }else if(mMenu === 'Clear Screen'){
    display();
    return;
  }else if(mMenu === 'Quit'){
    await quit();
  }
  main();
};

async function quit() {
  const db = await connect();
  db.end();
  clear();
  process.exit(0);
}

display();
