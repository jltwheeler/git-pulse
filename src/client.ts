import { GraphQLClient } from "graphql-request";
import { GITHUB_API_ENDPOINT } from "./utils/constants";
import * as dotenv from "dotenv";

dotenv.config();

const TOKEN: string | undefined = process.env?.GITHUB_TOKEN;

export default new GraphQLClient(GITHUB_API_ENDPOINT, {
  headers: {
    Authorization: `token ${TOKEN ? TOKEN : "secret"}`,
  },
});
