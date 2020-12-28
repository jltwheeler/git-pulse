import { GraphQLClient } from "graphql-request";
import { GITHUB_API_ENDPOINT } from "./utils/constants";

export const initClient = (token: string): GraphQLClient => {
  return new GraphQLClient(GITHUB_API_ENDPOINT, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
};
