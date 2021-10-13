const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

const fs = require('fs');
const inquirer = require('inquirer');

const fullTeam = [];

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
                    managerQuestions(response);
                    break;
                case 'Engineer':
                    console.log(`${response.employeeName} is an Engineer`);
                    engineerQuestions(response);
                    break;
                case 'Intern':
                    console.log(`${response.employeeName} is an Intern`);
                    internQuestions(response);
                    break;
                default:
                    console.log("Employee Not Found");
            }
        });
}

const managerQuestions = (initialQuestions) =>{
    inquirer.prompt ([
        {
            type: 'input',
            message: `What is the Manager's Office Number?`,
            name: 'officeNumber',
        },
        {
            type: 'confirm',
            message: `Employee created! Would you like to add a new employee?`,
            name: 'newEmployee',
        }
    ])
    .then((response) => {
        const newManager = new Manager(initialQuestions.employeeName, initialQuestions.employeeID, initialQuestions.employeeEmail, initialQuestions.employeePosition, response.officeNumber)
        console.log("New Manager: " + newManager);

        fullTeam.push(newManager);
        console.log(`Full Team: ${fullTeam}`);

        if(response.newEmployee === true){
            console.log("Create new Employee");
            employeeQuestions();
        }
        else{
            console.log("No more new employees");
            renderTeam(JSON.stringify(fullTeam));
        }
    })
}

// const engineerQuestions = () =>{
//     inquirer.prompt ([
//         {
//             type:'input',
//             message: 'Enter their GitHub username',
//             name: 'github',
//         },
//         {
//             type: 'confirm',
//             message: `Employee created! Would you like to add a new employee?`,
//             name: 'newEmployee',
//         }
//     ])
//     .then((response) => {
//         if(response.newEmployee === true){
//             console.log("Create new Employee");
//         }
//         else{
//             console.log("No more new employees");
//         }
//     })
    
// }

// const internQuestions = () => {
//     inquirer.prompt([
//         {
//             type: 'input',
//             message: 'What is the name of their school?',
//             name: 'schoolName',
//         },
//         {
//             type: 'confirm',
//             message: `Employee created! Would you like to add a new employee?`,
//             name: 'newEmployee',
//         }
//     ])
//     .then((response) => {
//         if(response.newEmployee === true){
//             console.log("Create new Employee");
//         }
//         else{
//             console.log("No more new employees");
//         }
//     })
// }


const renderTeam = (data) => {
    fs.writeFile('renderData.html', data, (error) =>{
        error ? console.error(error) : console.log(data)
    });
}

employeeQuestions();