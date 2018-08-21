#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const shell = require("shelljs");

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
        name: "FILENAME",
        message: "Please specify the name:"
      },
    ];
    return inquirer.prompt(questions);
};

const inprogress = (option) => {
  console.log(
    chalk.white.bgBlue(`Creating ${option} ...`)
  );
};

const run = async () => {
    const answers = await askQuestions();
    const { OPTION } = answers;
    inprogress(OPTION)
}

run();
