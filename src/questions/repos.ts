import inquirer from "inquirer";
import { RepoAnswer } from "../types";

export const repoQuestion = (): Promise<RepoAnswer> => {
  return inquirer.prompt([
    {
      type: "confirm",
      name: "addIssues",
      message:
        "Would you like to initialise your config file with a list of issues?",
    },
  ]);
};
