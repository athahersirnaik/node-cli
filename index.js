#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const shell = require("shelljs");
const ncp = require('ncp').ncp;
const fs = require('fs');

const askQuestions = () => {
    const questions = [
      {
        type: "list",
        name: "OPTION",
        message: "What do you want to create?",
        choices: ["Component", "Interface"],
      },
      {
        type: "input",
        name: "NAME",
        message: "Please specify the name:"
      },
    ];
    return inquirer.prompt(questions);
};

const inprogress = (option) => {
  console.log(
    chalk.black.bgBlue(`Creating ${option} ...`)
  );
};

const run = async () => {
    const answers = await askQuestions();
    const { OPTION, NAME } = answers;

    if(!NAME) {
      console.log(
        chalk.white.bgRed("Please enter a name of "+ OPTION +". And try again")
      )
      return;
    }
    
    if(OPTION == "Component") {
      inprogress(OPTION)
      
      if(!fs.existsSync('templates/component') ) {
        console.log(
          chalk.black.bgYellow(`You don't have source templates directory, please make sure you have templates/component folder in current working directory.`)
        )
        return;
      }else if (!fs.existsSync('packages')){
        fs.mkdirSync('packages');
      }
      ncp("templates/component","packages/dxp-"+NAME, function (err) {
        if(err) {
          return console.log(err)
        }
        console.log(
          chalk.black.bgGreen(`Created ${NAME} ${OPTION}`)
        )
      } )
    } else if(OPTION == "Interface") {
      console.log(
        chalk.black.bgYellow(`Not yet implemented`)
      )
    }
}

run();
