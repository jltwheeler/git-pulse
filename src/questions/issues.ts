import inquirer from "inquirer";
import ora from "ora";

import { initClient } from "../client";
import { VALIDATE_ISSUE } from "../queries";
import {
  InitIssuesAnswer,
  InsertIssueAnswer,
  IssueValidationResp,
} from "../types";
import { repoRegex, SLEEP_TIME } from "../utils/constants";
import { sleep } from "../utils/sleep";

let TOKEN = "";

export const initIssuesQuestion = (): Promise<InitIssuesAnswer> => {
  return inquirer.prompt([
    {
      type: "confirm",
      name: "addIssues",
      message:
        "Would you like to initialise your config file with a list of issues?",
    },
  ]);
};

export const validateIssue = async (
  input: string,
): Promise<boolean | string> => {
  const client = initClient(TOKEN);
  const result = repoRegex.exec(input);

  if (result) {
    const [owner, name, , issueNum] = result[0].split("/");

    try {
      const spinner = ora("Validating issue...").start();
      const resp: IssueValidationResp = await client.request(VALIDATE_ISSUE, {
        name,
        owner,
        issueNum: parseInt(issueNum),
      });

      await sleep(SLEEP_TIME);
      spinner.stop();

      if (resp.repository.issue.title) {
        return true;
      }
    } catch {
      throw new Error(`Error. ${input} is not a valid GitHub issue URL`);
    }
  } else {
    throw new Error(`Error. ${input} is not a valid GitHub issue URL`);
  }
  throw new Error("Error. Something went wrong");
};

const insertIssueQuestion = (): Promise<InsertIssueAnswer> => {
  return inquirer.prompt([
    {
      type: "string",
      name: "issue",
      message: "Please enter an issue you would like to track",
      validate: validateIssue,
    },
    {
      type: "confirm",
      name: "continue",
      message: "Would you like to add another issue?",
    },
  ]);
};

export const addIssueQuestions = async (token: string): Promise<string[]> => {
  let run = true;
  let issues: string[] = [];
  TOKEN = token;

  const recurse = async () => {
    const answer = await insertIssueQuestion();
    issues = issues.concat(answer.issue);

    if (answer.continue) {
      await recurse();
    } else {
      run = false;
    }
  };

  while (run) {
    await recurse();
  }
  return issues;
};
