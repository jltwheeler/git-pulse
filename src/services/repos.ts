import { gql } from "graphql-request";
import client from "../client";

import { createRepoQuery } from "../queries";
import { repoRegex } from "../utils/constants";

const sendInitQuery = async (repos: string[]): Promise<string> => {
  const queries: string[] = repos.map((repo: string, idx) => {
    const result = repoRegex.exec(repo);
    if (result) {
      const [owner, name] = result[0].split("/");
      return createRepoQuery(idx, name, owner);
    } else {
      throw new Error(`${repo} is not a correct repository URL`);
    }
  });

  const query = gql`
    query {
     ${queries.join("\n")}
    }
  `;
  return await client.request(query);
};

export default {
  sendInitQuery,
};
