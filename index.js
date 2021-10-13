const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

const fs = require('fs');
const inquirer = require('inquirer');


const employeeQuestions = () =>{
    inquirer
        .prompt([
        
            {
                type: 'input',
                message: 'Enter the name of the Employee.',
                name: 'employeeName',
            },
            {
                type: 'input',
                message: 'Enter the ID number of the Employee.',
                name: 'employeeID',
            },
            {
                type: 'input',
                message: 'Enter the Email address of the Employee.',
                name: 'employeeEmail',
            },
            {
                type: 'list',
                message: "What is this Employee's position for this project?",
                name: 'employeePosition',
                choices: ['Manager', 'Engineer', 'Intern']
            },
        ])
        .then((response) => {
            console.log(response);
        });
}

employeeQuestions();
