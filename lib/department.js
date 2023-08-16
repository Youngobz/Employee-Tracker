const { connect } = require('./connectDB');
const inquirer = require('inquirer');

async function viewDepartments() {
  const db = await connect();
  const sql = `SELECT * FROM department`;
  const [rows] = await db.execute(sql);
  console.log('\n');
  console.table(rows);
  console.log('\n');  
};



async function addDepartment(){
 const db = await connect();
 const query = [
    {
      name: 'dept',
      type: 'text',
      message: 'Please enter the name of the new Department'
    }
  ];
  const department = await inquirer.prompt(query);
  const {dept} = department;
  const sql = `INSERT INTO department (dept_name) VALUES (?)`;
  const [rows] = await db.execute(sql, [dept])
};

module.exports = {
  viewDepartments,
  addDepartment
};