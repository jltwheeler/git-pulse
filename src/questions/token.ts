import inquirer from "inquirer";

import { initClient } from "../client";
import { USER_RATE_LIMIT } from "../queries";
import { TokenAnswer } from "../types";

export const validateToken = async (
  input: string,
): Promise<boolean | string> => {
  if (!input) {
    return "Error. No token was provided";
  }

  const client = initClient(input);
  try {
    const resp: {
      rateLimit: { limit: number };
    } = await client.request(USER_RATE_LIMIT);
    if (resp.rateLimit.limit) {
      return true;
    }
  } catch (_) {
    return "Error. Please enter a valid authentication token.";
  }

  return "Error. Something went wrong.";
};

export const tokenQuestion = (): Promise<TokenAnswer> => {
  return inquirer.prompt([
    {
      type: "string",
      name: "token",
      message: "Please enter your GitHub user authentication token: ",
      validate: validateToken,
    },
  ]);
};
