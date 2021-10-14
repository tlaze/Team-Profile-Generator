// const Employee = require('./lib/employee'); //Might Not Need
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

const fs = require('fs');
const inquirer = require('inquirer');
const htmlFile = "./dist/index.html";

const teamArray = [];

const init = () => {
    initialHTML();
}

const initialHTML = () => {
    let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Project Team</title>
        </head>
        <body>
            <header>
                <div class="container-fluid">
                    <div class="row">
                        <div class="teamTitle">
                            <h1>Our Members</h1>
                        </div>
                    </div>
                </div>
            </header>

            <main>`
        fs.writeFile(htmlFile, html, (err) => {
            if(err){
                console.error(err);
            }
            else{
                console.log("HTML Initiated");
                employeeQuestions();
            }
        })

}


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
                    inquirer.prompt ([
                        {
                            type: 'input',
                            message: `What is the Manager's Office Number?`,
                            name: 'officeNumber',
                        },
                    ])
                    .then((data) => {
                        const newManager = new Manager(response.employeeName, response.employeeID, response.employeeEmail, data.officeNumber)
                        teamArray.push(newManager);
                        displayRole(newManager);
                        addNewTeamMember();
                    })
                    break;
                case 'Engineer':
                    engineerQuestions(response);
                    break;
                case 'Intern':
                    internQuestions(response);
                    break;
                default:
                    console.log("Employee Not Found");
            }
        });
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
        const newIntern = new Intern(initialQuestions.employeeName, initialQuestions.employeeID, initialQuestions.employeeEmail, response.schoolName);
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

const displayRole = (employee) => {
    console.log(employee);
    let html = '';
    switch(employee.getRole()){
        case 'Manager':
            console.log(`${employee.name} is a Manager`);
            html = `
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">${employee.name}</h3>
                    <h4 class="card-text">${employee.getRole()}</h4>
                    <p class="card-text">ID: ${employee.id}</p>
                    <a href="#" class="card-text">Email: ${employee.email}</a>
                    <a href="#" class="card-text">Phone #: ${employee.officeNumber}</a>
                </div>
            </div>`
            fs.appendFile(htmlFile, html, (err) => {
                if(err){
                    console.err(err);
                }
            })
            break;
        case 'Engineer':
            console.log(`${employee.employeeName} is an Engineer`)    
            break;
        case 'Intern':
            console.log(`${employee.employeeName} is an Intern`) 
            break;       
    }
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


init();