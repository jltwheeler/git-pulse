import * as dotenv from "dotenv";
dotenv.config();

const TOKEN: string = process.env?.GITHUB_TOKEN
  ? process.env.GITHUB_TOKEN
  : "secret";

export const tokenQuestion = jest.fn(() => {
  return Promise.resolve({ token: TOKEN });
});
