const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Rendering function
// const render = require("./lib/htmlRenderer");
// Alternative rendering function
const render = require("./lib/page-template.js");

const teamMembers = [];
// Create an id array to store the ids.
// This array will be used to check the potential duplicate id newly entered by user
const idArray = [];

function appMenu() {
  // Create manager first, then the manager will create a team
  // Once manager is craeted, we will create team by asking the user which type of employee to create
  // Based on the choice, we will create that employee object
  // Loop throu the create team function until user is done from creating employees for the team
  // then we will use the employee objects created to render html for the team

  function createManager() {
    console.log("Please build your team");
    inquirer
      .prompt([
        //
        // YOUR CODE HERE:
        // CREATE OBJECTS OF QUESTIONS HERE FOR MANAGER
        // Strongly recommend to add validate property function for id and email
        //
        {
          type: "input",
          name: "managerName",
          message: "Enter manager's name: ",
        },
        {
          type: "input",
          name: "managerId",
          message: "Enter manager's ID: ",
          validate: function (officeNumber) {
            valid = /^\d+$/.test(officeNumber);
            if (valid) {
              return true;
            } else {
              console.log(".  Please enter a valid number");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "managerEmail",
          message: "Enter manager's email: ",
          validate: function (email) {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            if (valid) {
              return true;
            } else {
              console.log(".  Please enter a valid email");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "Enter manager's office number: ",
          validate: function (officeNumber) {
            valid = /^\d+$/.test(officeNumber);
            if (valid) {
              return true;
            } else {
              console.log(".  Please enter a valid number");
              return false;
            }
          },
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: ["Engineer", "Intern", "I don't want to add any more team members"],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        //
        // YOUR CODE HERE
        // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
        //
        {
          type: "input",
          name: "engineerName",
          message: "Enter engineer's name: ",
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "Enter engineer's email: ",
          validate: function (email) {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            if (valid) {
              return true;
            } else {
              console.log(".  Please enter a valid email");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "Enter engineer's Github username: ",
        },
        {
          type: "input",
          name: "engineerId",
          message: "Enter engineer's ID: ",
          validate: function (officeNumber) {
            valid = /^\d+$/.test(officeNumber);
            if (valid) {
              return true;
            } else {
              console.log(".  Please enter a valid number");
              return false;
            }
          },
        },
      ])
      .then((answers) => {
        //
        // YOUR CODE HERE
        // 1. CREATE A VARIABLE TO STORE THE ENGINEER OBJECT INSTANTIATED WITH THE ENGINEER CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
        //    TO THE ENGINEER CLASS CONSTRUCTOR
        // 2. ADD (PUSH) THE ENGINEER VARIABLE TO the teamMembers ARRAY
        // 3. ADD (PUSH) THE ENGINERR ID TO THE idArray ARRAY
        //
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub
        );
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        //
        // YOUR CODE HERE
        // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
        //
        {
          type: "input",
          name: "internName",
          message: "Enter intern's name: ",
        },
        {
          type: "input",
          name: "internEmail",
          message: "Enter intern's email: ",
          validate: function (email) {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            if (valid) {
              return true;
            } else {
              console.log(".  Please enter a valid email");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "internSchool",
          message: "Enter intern's school: ",
        },
        {
          type: "input",
          name: "internId",
          message: "Enter intern's ID: ",
          validate: function (officeNumber) {
            valid = /^\d+$/.test(officeNumber);
            if (valid) {
              return true;
            } else {
              console.log(".  Please enter a valid number");
              return false;
            }
          },
        },
      ])
      .then((answers) => {
        //
        // YOUR CODE HERE
        // 1. CREATE A VARIABLE TO STORE THE INTERN OBJECT INSTANTIATED WITH THE INTERN CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
        //    TO THE INTERN CLASS CONSTRUCTOR
        // 2. ADD (PUSH) THE INTERN VARIABLE TO the teamMembers ARRAY
        // 3. ADD (PUSH) THE INTERN ID TO THE idArray ARRAY
        //
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(intern);
        idArray.push(answers.intern);
        createTeam();
      });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    console.log("Successfully created new team profile!");
  }

  createManager();
}

appMenu();
