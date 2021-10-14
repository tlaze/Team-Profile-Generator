// const Employee = require('./lib/employee'); //Might Not Need
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

const fs = require('fs');
const inquirer = require('inquirer');
const renderFile = require('./src/render.js')

const teamArray = [];

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
    ])
    .then((response) => {
        const newManager = new Manager(initialQuestions.employeeName, initialQuestions.employeeID, initialQuestions.employeeEmail, response.officeNumber)
        teamArray.push(newManager);
        addNewTeamMember();
    })
}

const engineerQuestions = (initialQuestions) =>{
    inquirer.prompt ([
        {
            type:'input',
            message: 'Enter their GitHub username',
            name: 'github',
        },
    ])
    .then((response) => {
        const newEngineer = new Engineer(initialQuestions.employeeName, initialQuestions.employeeID, initialQuestions.employeeEmail, response.github)
        teamArray.push(newEngineer);
        addNewTeamMember();
    })  
}

const internQuestions = (initialQuestions) => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of their school?',
            name: 'schoolName',
        },
    ])
    .then((response) => {
        const newIntern = new Intern(initialQuestions.employeeName, initialQuestions.employeeID, initialQuestions.employeeEmail, response.school);
        teamArray.push(newIntern);
        addNewTeamMember();
    })
}

const addNewTeamMember = () => {
    inquirer.prompt([
        {
            type: 'confirm',
            message: `Employee created! Would you like to add a new employee?`,
            name: 'newEmployee',
        },
    ])
    .then((response) => {
        if(response.newEmployee === true){
            console.log("Ok Lets Add Another Employee:");
            employeeQuestions();
        }
        else{
            renderTeam();
        }

    })
}


const renderTeam = () => {


    fs.writeFile('./src/render.js', JSON.stringify(teamArray), (error) =>{
        error ? console.error(error) : console.log(`File Created: ${JSON.stringify(teamArray)}`)
    });

    // fs.appendFile('./src/render.js', JSON.stringify(engineerArray), (error) =>{
    //     error ? console.error(error) : console.log(`Engineers: ${JSON.stringify(engineerArray)}`)
    // });

    // fs.appendFile('./src/render.js', JSON.stringify(internArray), (error) =>{
    //     error ? console.error(error) : console.log(`Interns: ${JSON.stringify(internArray)}`)
    // });

}

employeeQuestions();