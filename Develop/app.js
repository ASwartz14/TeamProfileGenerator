const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// questions for managers
const managerQs = (name, id, email, role) => {
    inquirer
        .prompt([{

            type: "input",
            message: "What the manager's office number?",
            name: "officeNumber"
        }, ])
        .then(({
            officeNumber
        }) => {
            const manager = new Manager(name, id, email, officeNumber);
            employees.push(manager);
            newEmployee();
        });
};
// questions for engineers
const engineerQs = (name, id, email, role) => {
    inquirer
        .prompt([{

            type: "input",
            message: "What the engineer's github?",
            name: "github"

        }, ])
        .then(({
            github
        }) => {
            const engineer = new Engineer(name, id, email, github);
            employees.push(engineer);
            newEmployee();
        });
};
// questions for interns
const internQs = (name, id, email, role) => {
    inquirer
        .prompt([{
            type: "input",
            message: "What school did/does this intern attend?",
            name: "school"


        }, ])
        .then(({
            school
        }) => {
            const intern = new Intern(name, id, email, school);
            employees.push(intern);
            newEmployee();
        });
};
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
const newEmployee = () => {
    inquirer
        .prompt([{
            type: "confirm",
            message: "Would you like to add another employee?",
            name: "add",
        }, ])
        .then(({
            add
        }) => {
            if (add) {
                employeeQs();
            } else {
                const profileOutput = render(employees);
                fs.writeFile(outputPath, profileOutput, (error) => {
                    if (error) {
                        console.log(error);
                    }
                });
            }
        });
};
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employeeQs = () => {
    inquirer
        .prompt([{
                type: "input",
                message: "What is this employee's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What this employee's ID number?",
                name: "id"
            },
            {
                type: "input",
                message: "What is this employee's email address?",
                name: "email"
            },
            {
                type: "list",
                message: "What is this employee's role?",
                name: "role",
                choices: [{
                        name: "Manager",
                        value: managerQs
                    },
                    {
                        name: "Engineer",
                        value: engineerQs
                    },
                    {
                        name: "Intern",
                        value: internQs
                    },
                ]
            },
        ])
        .then(({
            name,
            id,
            email,
            role,

        }) => {
            role(name, id, email);
        });

};
// go html
employeeQs();


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