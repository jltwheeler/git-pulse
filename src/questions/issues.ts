import inquirer from "inquirer";

import { InitIssuesAnswer, InsertIssueAnswer } from "../types";

export const initIssueQuestion = (): Promise<InitIssuesAnswer> => {
  return inquirer.prompt([
    {
      type: "confirm",
      name: "addIssues",
      message:
        "Would you like to initialise your config file with a list of issues?",
    },
  ]);
};

const insertIssueQuestion = (): Promise<InsertIssueAnswer> => {
  return inquirer.prompt([
    {
      type: "string",
      name: "issue",
      message: "Please enter an issue you would like to track",
    },
    {
      type: "confirm",
      name: "continue",
      message: "Would you like to add another issue?",
    },
  ]);
};

export const addIssueQuestions = async (): Promise<void> => {
  let run = true;

  const recurse = async () => {
    const answer = await insertIssueQuestion();
    if (answer.continue) {
      await recurse();
    } else {
      run = false;
    }
  };

  while (run) {
    await recurse();
  }
};
