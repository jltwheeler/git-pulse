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
      message:
        "Please enter the link of the repository you would like to track.",
    },
    {
      type: "confirm",
      name: "continue",
      message: "Would you like to add another repository?",
    },
  ]);
};

export const addRepoQuestions = async (): Promise<string[]> => {
  let run = true;
  let repos: string[] = [];

  const recurse = async () => {
    const answer = await insertRepoQuestion();
    repos = repos.concat(answer.repo);

    if (answer.continue) {
      await recurse();
    } else {
      run = false;
    }
  };

  while (run) {
    await recurse();
  }
  return repos;
};
