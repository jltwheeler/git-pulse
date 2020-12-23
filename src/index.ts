#!/usr/bin/env node

import yargs from "yargs/yargs";
import inquirer from "inquirer";
import chalk from "chalk";

import initCmd from "./commands/init";

yargs(process.argv.slice(2))
  .version(process.env?.npm_package_version || "0.0.0")
  .scriptName("git-pulse")
  .usage("Usage: $0 -r string -i string")
  .command(initCmd)
  .command("ask", "test inquirer command", (_) => {
    inquirer
      .prompt([
        {
          type: "string",
          name: "token",
          message: "Please enter your GitHub user account token.",
        },
      ])
      .then((answers: { token: string }) => {
        console.log(`Thank you, your github token ${answers.token} is valid.`);
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.log(`Something went wrong. ${error.message}`);
        }
      });
  })
  .fail((_, error) => console.log(chalk.red(error)))
  .help()
  .parse();
