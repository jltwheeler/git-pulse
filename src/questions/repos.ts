import inquirer from "inquirer";

import { initClient } from "../client";
import { VALIDATE_REPO } from "../queries";
import {
  InitReposAnswer,
  InsertRepoAnswer,
  RepoValidationResp,
} from "../types";
import { repoRegex } from "../utils/constants";

let TOKEN = "";

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

export const validateRespository = async (
  input: string,
): Promise<boolean | string> => {
  const client = initClient(TOKEN);
  const result = repoRegex.exec(input);

  if (result) {
    const [owner, name] = result[0].split("/");

    try {
      const resp: RepoValidationResp = await client.request(VALIDATE_REPO, {
        name,
        owner,
      });
      if (resp.repository.url) {
        console.log(resp.repository.url);
        return true;
      }
    } catch {
      throw new Error(`Error. ${input} is not a valid GitHub repository URL`);
    }
  } else {
    throw new Error(`Error. ${input} is not a valid GitHub repository URL`);
  }
  throw new Error("Error. Something went wrong");
};

const insertRepoQuestion = (): Promise<InsertRepoAnswer> => {
  return inquirer.prompt([
    {
      type: "string",
      name: "repo",
      message:
        "Please enter the link of the repository you would like to track.",
      validate: validateRespository,
    },
    {
      type: "confirm",
      name: "continue",
      message: "Would you like to add another repository?",
    },
  ]);
};

export const addRepoQuestions = async (token: string): Promise<string[]> => {
  let run = true;
  let repos: string[] = [];
  TOKEN = token;

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
