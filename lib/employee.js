class Employee{
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName(name){
        console.log(`Name: ${name}`);
        return this.name;
    }
    getId(id){
        console.log(`ID: ${id}`);
        return this.id;
    }
    getEmail(email){
        console.log(`Email: ${email}`);
        return this.email;
    }
    getRole(){
        return Employee
    }
}
module.exports = Employee;