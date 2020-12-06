// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    // getters
    getRole() {
        return "Intern";
    }
    getSchool() {
        return this.school;
    }
    printInfo() {
        console.log(`${this.name}(id:${this.id}) is an ${this.getRole()}. He can be reached at ${this.email}. His school is ${this.getSchool()}`);
    }
}
module.exports = Intern;