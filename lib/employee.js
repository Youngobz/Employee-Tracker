const { connect } = require('./connectDB');
const inquirer = require('inquirer');

async function viewEmployees() {
  const db = await connect();
  const sql = `SELECT employee.id AS Emp_ID, CONCAT(employee.first_name,' ', employee.last_name) AS Employee_Name, roles.title AS Title, department.dept_name AS Department_Name, roles.salary AS Salary, CONCAT(man.first_name, ' ', man.last_name) AS Manager FROM employee LEFT JOIN roles ON employee.roles_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee man ON employee.manager = man.id`;
  const [rows] = await db.execute(sql);
  console.log('\n');
  console.table(rows); 
  console.log('\n');
};

async function getRoles(){
  const db = await connect();
  const sql = `SELECT CONCAT(id,' ', title) AS title FROM roles`;
  const [rows] = await db.execute(sql);
  let roles = [];
  Object.values(rows).forEach((row) => {roles.push(row.title)});
  return roles;
};

async function addEmployee() {
  const db = await connect();
  const names = await getNames();
  const roles = await getRoles();
  console.log('\n');
  const query = [
    { 
      name: 'fn',
      type: 'text',
      message: 'Please enter the new employee\'s First Name: '
    },
    {
      name: 'ln',
      type: 'text',
      message: 'Please enter the new employee\'s Last Name: '
    },
    {
      name: 'rid',
      type: 'list',
      message: 'Please select the new employee\'s Title: ',
      choices: roles,
      loop: false
    },
    {
      name: 'man',
      type: 'list',
      message: 'Please select the new employee\'s Manager: ',
      choices: names,
      loop: false
    }
  ];
  const nEmp = await inquirer.prompt(query);
  const role_id = roles.indexOf(nEmp.rid) + 1;
  const { fn, ln, man } = nEmp;
  if(man === 'No Manager'){
    manager = null
  }else{
    manager = parseInt(man)
  }
  const sql = 'INSERT INTO employee (first_name, last_name, roles_id, manager) VALUES(?,?,?,?)';
  const [rows] = await db.execute(sql, [fn, ln, role_id, manager]);
};

async function updateEmployee() {
  const db = await connect();
  const names_tmp = await getNames();
  const names = names_tmp.slice(1);
  const roles = await getRoles();
  console.log('\n');
  console.log('Update and Employee\'s Role');
  console.log('\n');
  const query = [
    {
      name: 'emp',
      type: 'list',
      message: 'Please select the Employee to update:',
      choices: names,
      loop: false
    },
    {
      name: 'role',
      type: 'list',
      message: 'Please select the new Role for this Employee:',
      choices: roles,
      loop: false
    }
  ];
  const uEmp = await inquirer.prompt(query);
  const { emp, role } = uEmp;
  const emp_id = parseInt(emp);
  const role_id = parseInt(role);
  const sql = 'UPDATE employee SET roles_id = ? WHERE id = ?';
  const [rows] = await db.execute(sql, [role_id, emp_id])
  viewEmployeeByid(emp_id);
};

async function viewEmployeeByid(emp_id){
  const db = await connect();
  const sql = `SELECT employee.id AS Emp_ID, CONCAT(employee.first_name,' ', employee.last_name) AS Employee_Name, roles.title AS Title, department.dept_name AS Department_Name, roles.salary AS Salary, CONCAT(man.first_name, ' ', man.last_name) AS Manager FROM employee LEFT JOIN roles ON employee.roles_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee man ON employee.manager = man.id WHERE employee.id = ?`;
  const [rows] = await db.execute(sql, [emp_id]);
  console.log('\n');
  console.table(rows); 
  console.log('\n');
  console.log('Employee successfully Updated.');
};

async function getNames(){
  const db = await connect();
  const sql = `SELECT CONCAT(id,' ',first_name,' ',last_name) AS name FROM employee`;
  const [rows] = await db.execute(sql);
  let names = ['No Manager'];
  Object.values(rows).forEach((row) => {names.push(row.name)});
  return names;
};

module.exports = {
  viewEmployees,
  addEmployee,
  updateEmployee,
  viewEmployeeByid,
  getNames,
};
