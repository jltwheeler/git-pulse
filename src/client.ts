import { GraphQLClient } from "graphql-request";
import { GITHUB_API_ENDPOINT } from "./utils/constants";

export default new GraphQLClient(GITHUB_API_ENDPOINT, {
  headers: {
    Authorization: `token b5413d05786ae4b2c53ab97891c7aa3347fc1657`,
  },
});
