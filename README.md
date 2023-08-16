# Employee Management System

The Employee Management System is a command-line application built in Node.js that allows you to manage employee data in a MySQL database. This application provides functionalities to view, add, and update employees, roles, and departments within your organization.
https://github.com/Youngobz/Employee-Tracker/assets/133522178/e7797483-0077-486a-9aa8-6ef5daaa90cd
## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- MySQL Server

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory using the command line.
3. Run `npm install` to install the required dependencies.

## Usage

To run the Employee Management System, follow these steps:

1. Open a terminal window and navigate to the project directory.
2. Run the following command to start the application:

```bash
node index.js
```

3. The application will display the main menu with various options to manage employees, roles, and departments.

## Features

- View all employees, roles, and departments.
- Add new employees, roles, and departments.
- Update an employee's role.
- Clear the screen for better readability.
- Quit the application.

## Database Schema

The application uses a MySQL database with the following schema:

- `department` table: Stores department information.
- `roles` table: Stores role information, including the associated department.
- `employee` table: Stores employee information, including their role and manager.

## Main Questions

The application's main menu is driven by the following questions:

```javascript
const mainQuestions = [
  // ... list of menu options ...
];
```

## Code Structure

The project is organized into different modules:

- `index.js`: Entry point of the application.
- `connectDB.js`: Manages database connections.
- `constants/main_question.json`: Contains the main menu questions.
- `lib/department.js`: Contains functions to view and add departments.
- `lib/role.js`: Contains functions to view and add roles.
- `lib/employee.js`: Contains functions to view, add, and update employees.
- `lib/employee.js`: Contains functions to view, add, and update employees.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## Author

This Employee Management System is developed by Mohammed Minhajur Rahman.
