class Employee{
    constructor(name,id,email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName(){
        console.log("Name: ");
    }
    getId(){
        console.log("ID: ");
    }
    getEmail(){
        console.log("Email: ");
    }
    getRole(){
        return Employee
    }
}

class Manager extends Employee{
    constructor (officeNumber){
        this.officeNumber = officeNumber;
    }
    getRole(){
        return Manager
    }
}

class Engineer extends Employee{
    constructor(github){
        this.github = github;
    }
    getGithub(){
        console.log("Github: ");
    }
    getRole(){
        return Engineer
    }
}

class Intern extends Employee{
    constructor(school){
    this.school = school;
    }
    getSchool(){
        console.log("School: ");
    }

    getRole(){
        return Intern
    }
}