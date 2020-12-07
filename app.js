const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

let employees = []; // array of employees to render

function addEmployee() {
    inquirer
        .prompt([{
                type: 'input',
                message: 'Enter employee name:',
                name: 'name',
                validate: (input, answers) => {
                    if (/^[A-za-z]+$/.test(input)) {
                        return true;
                    } else {
                        console.log("\nPlease enter alphabetic characters only");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                message: 'Enter employee id:',
                name: 'id',
                validate: (input, answers) => {
                    if (/^[0-9]+$/.test(input)) {
                        return true;
                    } else {
                        console.log("\nPlease enter numeric characters only");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                message: 'Enter employee email:',
                name: 'email',
                validate: (input, answers) => {
                    if (/.@./.test(input)) {
                        return true;
                    } else {
                        console.log("\nPlease enter a valid e-mail address");
                        return false;
                    }
                }
            },
            {
                type: 'rawlist',
                message: 'Enter employee role:',
                name: 'role',
                choices: ['Intern', 'Engineer', 'Manager']
            },
            {
                type: 'input',
                message: 'Enter office number:',
                name: 'officeNumber',
                when: (answers) => answers.role == 'Manager',
                validate: (input, answers) => {
                    if (/^[0-9]+$/.test(input)) {
                        return true;
                    } else {
                        console.log("\nPlease enter numeric characters only");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                message: 'Enter github username:',
                name: 'github',
                when: (answers) => answers.role == 'Engineer',
                validate: (input, answers) => {
                    if (/^[a-zA-Z0-9]+$/.test(input)) {
                        return true;
                    } else {
                        console.log("\nPlease enter alpha-numeric characters only");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                message: 'Enter school name:',
                name: 'school',
                when: (answers) => answers.role == 'Intern',
                validate: (input, answers) => {
                    if (/^[A-z\sa-z]+$/.test(input)) {
                        return true;
                    } else {
                        console.log("\nPlease enter alphabetic characters only");
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                message: 'Do you want to add another employee?',
                name: 'addMore',
            },
        ])
        .then((response) => {
            switch (response.role) {
                case 'Intern':
                    employees.push(new Intern(response.name, response.id, response.email, response.school));
                    break;
                case 'Engineer':
                    employees.push(new Engineer(response.name, response.id, response.email, response.github));
                    break;
                case 'Manager':
                    employees.push(new Manager(response.name, response.id, response.email, response.officeNumber));
                    break;
            }
            if (response.addMore) {
                // make a recursive call to add more employees
                addEmployee();
            } else {
                // employees.forEach(item => item.printInfo()); // for debug only
                let htmlContent = render(employees);
                // create directory if it does not exist
                if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR);
                }
                // generate team.html
                fs.writeFile(outputPath, htmlContent, (err) => {
                    if (err !== null)
                        console.log(err);
                });
            }
        });
}

addEmployee();