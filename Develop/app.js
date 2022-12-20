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
const initialQuestions = [
    {
        type: "input",
        message: "What is the name of the employee you would like to add to the team?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the employee's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the employee's email address?",
        name: "email"
    },
    {
        type: "checkbox",
        message: "What is the role of the employee?",
        choices: ["Engineer", "Intern", "Manager"],
        name: "role"
    }
]

inquirer.prompt(initialQuestions) 

.then((data)=> {
    const name = data.name;
    const email = data.email;
    const id = data.id;
    if(data.role == "Engineer") {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the engineer's GitHub?",
                name: "github"
            }
        ])
        .then((data)=> {
            const newEngineer = new Engineer(name,id,email, data.github);
            console.log(newEngineer);
        })
    } else if (data.role == "Intern") {
        inquirer.prompt([
            {
                type: "input",
                message: "What school is the intern from?",
                name: "school"
            }
        ])
        .then((data)=> {
            const newIntern = new Intern(name,id,email, data.school);
            console.log(newIntern);
        })
    } else if (data.role == "Manager") {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the manager's office number?",
                name: "officeNumber"
            }
        ])
        .then((data)=> {
            const newManager = new Manager(name,id,email, data.officeNumber);
            console.log(newManager);
        })
    }
})
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
