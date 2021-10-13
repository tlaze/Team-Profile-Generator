class Employee{
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName(){
        console.log(`Name: ${name}`);
        return this.name;
    }
    getId(){
        console.log(`ID: ${id}`);
        return this.id;
    }
    getEmail(){
        console.log(`Email: ${email}`);
        return this.email;
    }
    getRole(){
        return "Employee"
    }
}
module.exports = Employee;