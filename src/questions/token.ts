import inquirer from "inquirer";

import { initClient } from "../client";
import { USER_RATE_LIMIT } from "../queries";
import { TokenAnswer, TokenValidationResp } from "../types";

export const validateToken = async (
  input: string,
): Promise<boolean | string> => {
  if (!input) {
    throw new Error("Error. No token was provided");
  }

  const client = initClient(input);
  try {
    const resp: TokenValidationResp = await client.request(USER_RATE_LIMIT);
    if (resp.rateLimit.limit) {
      return true;
    }
  } catch (_) {
    throw new Error("Error. Please enter a valid authentication token.");
  }

  throw new Error("Error. Something went wrong.");
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
