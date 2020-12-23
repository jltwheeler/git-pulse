import inquirer from "inquirer";
import { IssuesAnswer } from "../types";

export const repoQuestion = (): Promise<IssuesAnswer> => {
  return inquirer.prompt([
    {
      type: "confirm",
      name: "addRepo",
      message:
        "Would you like to initialise your config file with a list of repositories?",
    },
  ]);
};
