const { connect } = require('./connectDB');
const inquirer = require('inquirer');

async function viewRoles() {
  const db = await connect();
  const sql = `SELECT * FROM roles`;
  const [rows] = await db.execute(sql);
  console.log('\n');
  console.table(rows); 
  console.log('\n');
};

async function getDepartments(){
  const db = await connect();
  const sql = `SELECT CONCAT(id,' ',dept_name) AS dept FROM department`;
  const [rows] = await db.execute(sql);
  let depts = [];
  Object.values(rows).forEach((row) => {depts.push(row.dept)});
  return depts;
};

async function addRole(){
  const db = await connect();
  const depts = await getDepartments();
  const query = [
    {
      name: 'title',
      type: 'text',
      message: 'Please enter the Title of the new Role: '
    },
    {
      name: 'salary',
      type: 'number',
      message: 'Please enter the Salary for this new Role (whole dollars): $',
    },
    {
      name: 'department_id',
      type: 'list',
      message: 'Please select the associated Department for this new Role:',
      choices: depts,
      loop: false
    }
  ];
  const department = await inquirer.prompt(query);
  const {title, salary, department_id} = department;
  const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
  const id = parseInt(department_id);
  const [rows] = await db.execute(sql, [title, salary, id])
};

module.exports = {
  viewRoles,
  addRole,
};
