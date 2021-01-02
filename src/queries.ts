import { gql } from "graphql-request";

export const VALIDATE_REPO = gql`
  query validateRepo($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      url
    }
  }
`;

export const VALIDATE_ISSUE = gql`
  query validateIssue($name: String!, $owner: String!, $issueNum: Int!) {
    repository(name: $name, owner: $owner) {
      issue(number: $issueNum) {
        title
      }
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
