import inquirer from "inquirer";

import { InitReposAnswer, InsertRepoAnswer } from "../types";

export const initReposQuestion = (): Promise<InitReposAnswer> => {
  return inquirer.prompt([
    {
      type: "confirm",
      name: "addRepos",
      message:
        "Would you like to initialise your config file with a list of repositories?",
    },
  ]);
};

const insertRepoQuestion = (): Promise<InsertRepoAnswer> => {
  return inquirer.prompt([
    {
      type: "string",
      name: "repo",
      message: "Please enter a repository you would like to track",
    },
    {
      type: "confirm",
      name: "continue",
      message: "Would you like to add another repository?",
    },
  ]);
};

export const addRepoQuestions = async (): Promise<void> => {
  let run = true;

  const recurse = async () => {
    const answer = await insertRepoQuestion();
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
