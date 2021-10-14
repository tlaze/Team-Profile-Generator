// Access lib files
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

//Access filesystem
const fs = require('fs');
//Access inquirer dependency
const inquirer = require('inquirer');

//Variable of the index.html path to display html
const htmlFile = "./dist/index.html";

//function to start program
const init = () => {
    console.log("Welcome! Now that your project is complete lets show off everyone who contributed.");
    console.log("Lets Start:")
    initialHTML();
}

//Creates the starting html up until the employee cards
const initialHTML = () => {
    let htmlStart = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Project Team</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <link rel="stylesheet" type="text/css" href="./dist/style.css">
            </head>
        <body>

            <header>
                <div class="jumbotron jumbotron-flud bg-success">
                    <div class="container">
                        <h1 class="display-3 text-center text-white">Project Members</h1>
                        </div>
                    </div>
                </div>
            </header>

            <main bg-light>
                <div class="container-fluid">
                    <div class="row justify-content-center">`
        //Writes above html to index.html            
        fs.writeFile(htmlFile, htmlStart, (err) => {
            if(err){
                console.error(err);
            }
            else{
                employeeQuestions();
            }
        })
}
//Displays each html depending on whether user adds more employees
const displayRole = (employee) => {
    let htmlContent = '';
    switch(employee.getRole()){
        //Switch statement depending on if the user chose each employee. Creates html specific for that employee
        //and appends it to index.html file
        case 'Manager':
            htmlContent = `
            <div class="card bg-light col-md-3 m-3 order-1">
                <div class="card-header bg-primary m-2 text-white">
                    <h4 class="card-title text-center">${employee.name}</h4>
                    <h5 class="card-text text-center">${employee.getRole()}</h5>
                </div>
                <div class="card-body">
                        <p class="card-text">Employee ID: ${employee.id}</p>
                        <p class="card-text">Email: <a href="mailto:${employee.email}">${employee.email}</a></p>
                        <p class="card-text">Phone#: ${employee.officeNumber}</p>
                    </div>
                </div>`
            fs.appendFile(htmlFile, htmlContent, (err) => {
                if(err){
                    console.err(err);
                }
            })
            break;
        case 'Engineer':
            htmlContent = `
            <div class="card bg-light col-md-3 m-3 order-2">
                <div class="card-header bg-danger m-2 text-white">
                    <h4 class="card-title text-center">${employee.name}</h4>
                    <h5 class="card-text text-center">${employee.getRole()}</h5>
                </div>
                <div class="card-body">
                        <p class="card-text">Employee ID: ${employee.id}</p>
                        <p class="card-text">Email: <a href="mailto:${employee.email}">${employee.email}</a></p>
                        <p class="card-text">GitHub: <a href="https://github.com/${employee.github}">${employee.github}</a></p>
                    </div>
                </div>`
            fs.appendFile(htmlFile, htmlContent, (err) => {
                if(err){
                    console.err(err);
                }
            })    
            break;
        case 'Intern':
            htmlContent = `
                <div class="card bg-light col-md-3 m-3 order-3">
                    <div class="card-header bg-secondary m-2 text-white">
                        <h4 class="card-title text-center">${employee.name}</h4>
                        <h5 class="card-text text-center">${employee.getRole()}</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Employee ID: ${employee.id}</p>
                        <p class="card-text">Email: <a href="mailto:${employee.email}">${employee.email}</a></p>
                        <p class="card-text">School: ${employee.school}</p>
                    </div>
                </div>`
            fs.appendFile(htmlFile, htmlContent, (err) => {
                if(err){
                    console.err(err);
                }
            })   
            break;       
    }
}
//Closing html content. Gets appended to index.html
const endingHTML = () => {
    console.log("All Done! The HTML is updated. Open the index.html file to view the web page.");
    let htmlEnd = `
                    </div>
                </div>
            </main>
        </body>

        <footer>
            <h6 class="text-center">Made by Tom | 2021</h6>
        </footer>`
    fs.appendFile(htmlFile, htmlEnd, (err) => {
        if(err){
            console.err(err);
        }
    })
}
//Prompts the user to enter information for all employees
const employeeQuestions = () =>{
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the employees name',
                name: 'employeeName',
            },
            {
                type: 'input',
                message: 'What is their ID number?',
                name: 'employeeID',
            },
            {
                type: 'input',
                message: 'Now enter their email address.',
                name: 'employeeEmail',
            },
            {
                type: 'list',
                message: "What title do they hold?",
                name: 'employeePosition',
                choices: ['Manager', 'Engineer', 'Intern'],
            },
    ])
    .then((response) => {
        //Switch statement depending on which employee the user chose next
        //Each employee has separate questions.
        //Uses each employee object to send to displayRole()
        //Goes to addNewTeamMember()
        switch(response.employeePosition){
            case 'Manager':
                inquirer.prompt ([
                    {
                        type: 'input',
                        message: `What is ${response.employeeName}'s office phone number?`,
                        name: 'officeNumber',
                    },
                ])
                .then((data) => {
                    const newManager = new Manager(response.employeeName, response.employeeID, response.employeeEmail, data.officeNumber)
                    displayRole(newManager);
                    addNewTeamMember();
                })
                break;
            case 'Engineer':
                inquirer.prompt ([
                    {
                        type:'input',
                        message: `Enter ${response.employeeName}'s GitHub username`,
                        name: 'github',
                    },
                ])
                .then((data) => {
                    const newEngineer = new Engineer(response.employeeName, response.employeeID, response.employeeEmail, data.github)
                    displayRole(newEngineer);
                    addNewTeamMember();
                })  
                break;
            case 'Intern':
                inquirer.prompt([
                    {
                        type: 'input',
                        message: `What school does ${response.employeeName} go to?`,
                        name: 'schoolName',
                    },
                ])
                .then((data) => {
                    const newIntern = new Intern(response.employeeName, response.employeeID, response.employeeEmail, data.schoolName);
                    displayRole(newIntern);
                    addNewTeamMember();
                })
                break;
            default:
                console.log("Employee Not Found");
                break;
        }
    });
}
//Asks if user wants to create another employee
//Repeats employeeQuestions() if true
//Goes to endingHTML() if not
const addNewTeamMember = () => {
    inquirer.prompt([
        {
            type: 'confirm',
            message: `Great! The employee data was created. Would you like to add another?`,
            name: 'newEmployee',
        },
    ])
    .then((response) => {
        if(response.newEmployee === true){
            console.log("Ok. Lets add another employee:");
            employeeQuestions();
        }
        else{
            endingHTML();
        }
    })
}
//Starts program
init();