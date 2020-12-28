import { GraphQLClient } from "graphql-request";
import { configOutputPath, GITHUB_API_ENDPOINT } from "./utils/constants";
import { parseConfigYaml } from "./utils/parsers";
import { Config } from "./types";

export const initClient = (token?: string): GraphQLClient => {
  const headers = { Authorization: "" };

  if (token) {
    headers.Authorization = `token ${token}`;
  } else {
    const config: Config = parseConfigYaml(configOutputPath);
    headers.Authorization = `token ${config.username.authToken}`;
  }

  return new GraphQLClient(GITHUB_API_ENDPOINT, {
    headers,
  });
};
