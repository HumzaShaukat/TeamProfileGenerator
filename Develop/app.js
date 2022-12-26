const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var teamList = [];
const addEmployee = [ //this object contains all of the information for inquirer to ask the user what additional team members to add.
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
        choices: ["Engineer", "Intern"],
        name: "role"
    }
]
const initialQuestions = [ //this object contains the original list of questions asked when declaring a manager and team
    {
        type: "input",
        message: "Please enter the team manager's name.",
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
        type: "input",
        message: "What is the manager's office number?",
        name: "officeNumber"
    },
    {
        type: "checkbox",
        message: "Would you like to add another employee after this?",
        choices: ["Yes", "No"],
        name: "continue"
    }
]

function init() { //this function defines the manager of the team and calls the addAnother function afterward
    let manager; 
    inquirer.prompt(initialQuestions) 
    .then((data)=> {
        const another = data.continue;
        manager = new Manager(data.name, data. id, data.email, data.officeNumber)
        teamList.push(manager);
        addAnother(another);
    })
}

function addAnother(input) { //if the user wants to add more team members, this function calls that function, if the user is done, it will render the HTML file
    if (input == "Yes") {
        addTeamMember();
    } else {
        //render HTML File
        let newInput = render(teamList);
        createHTML(newInput);
    }
}
function addTeamMember() { //this function adds employees ot the teamList array and asks role specific questions
    inquirer.prompt(addEmployee) 
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
                },
                {
                    type: "checkbox",
                    message: "Would you like to add another employee after this?",
                    choices: ["Yes", "No"],
                    name: "continue"
                }
            ])
            .then((data)=> {
                another = data.continue;
                const newEngineer = new Engineer(name, id, email, data.github);
                teamList.push(newEngineer);
                addAnother(another);
            })
        } else if (data.role == "Intern") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What school is the intern from?",
                    name: "school"
                },
                {
                    type: "checkbox",
                    message: "Would you like to add another employee after this?",
                    choices: ["Yes", "No"],
                    name: "continue"
                }
            ])
            .then((data)=> {
                another = data.continue;
                const newIntern = new Intern(name,id,email, data.school);
                teamList.push(newIntern);
                addAnother(another);
            })
        }
    })
}

function createHTML(textInput) { //this function writes the final html file
    fs.writeFile("../dist/output/team.html", textInput, (err) =>
    err ? console.error(err) : console.log('Success!'))
}

init();