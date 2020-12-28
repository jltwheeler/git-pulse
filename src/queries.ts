import { gql } from "graphql-request";

export const createRepoQuery = (
  prefix: number,
  name: string,
  owner: string,
): string => {
  return `request${prefix}: repository(name: "${name}", owner: "${owner}") {
    description
  }`;
};

export const VALIDATE_REPO = gql`
  query validateRepo {
    repository(name: $name, owner: $owner) {
      url
    }
  }
`;

export const USER_RATE_LIMIT = gql`
  query userAuth {
    rateLimit {
      limit
    }
  }
`;
