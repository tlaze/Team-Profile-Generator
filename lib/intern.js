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