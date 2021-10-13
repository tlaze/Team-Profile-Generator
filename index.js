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
                choices: ['Manager', 'Engineer', 'Intern'],
            },
        ])
        .then((response) => {
            console.log(response);
            switch(response.employeePosition){
                case 'Manager':
                    console.log(`${response.employeeName} is a Manager`);
                    managerQuestions();
                    break;
                case 'Engineer':
                    console.log(`${response.employeeName} is an Engineer`);
                    engineerQuestions();
                    break;
                case 'Intern':
                    console.log(`${response.employeeName} is an Intern`);
                    internQuestions();
                    break;
                default:
                    console.log("Employee Not Found");
            }
        });
}

const managerQuestions = () =>{
    inquirer.prompt ([
        {
            type: 'input',
            message: `What is the Manager's Office Number?`,
            name: 'officeNumber',
        }
    ])
}

const engineerQuestions = () =>{
    inquirer.prompt ([
        {
            type:'input',
            message: 'Enter their GitHub link',
            name: 'github',
        }
    ])
}

const internQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of their school?',
            name: 'schoolName',
        }
    ])
}

employeeQuestions();
