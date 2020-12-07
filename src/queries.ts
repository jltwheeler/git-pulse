// import { gql } from "graphql-request";

export const createRepoQuery = (
  prefix: number,
  name: string,
  owner: string,
): string => {
  return `request${prefix}: repository(name: "${name}", owner: "${owner}") {
    description
  }`;
};
