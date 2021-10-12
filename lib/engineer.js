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