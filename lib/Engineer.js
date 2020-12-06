// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    // getters
    getRole() {
        return "Engineer";
    }
    getGithub() {
        return this.github;
    }
    printInfo() {
        console.log(`${this.name}(id:${this.id}) is an ${this.getRole()}. He can be reached at ${this.email}. Check out his github @ ${this.getGithub()}`);
    }
}
module.exports = Engineer;