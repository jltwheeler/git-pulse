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

export const FETCH_ISSUE = gql`
  query fetchIssue($name: String!, $owner: String!, $issueNum: Int!) {
    repository(name: $name, owner: $owner) {
      issue(number: $issueNum) {
        title
        closedAt
        createdAt
        lastEditedAt
        reactions {
          totalCount
        }
        state
        comments(last: 5) {
          nodes {
            createdAt
            bodyText
          }
          totalCount
        }
      }
      url
    }
  }
`;

export const FETH_REPO = gql`
  query fetchRepo($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      forkCount
      issues(states: OPEN) {
        totalCount
      }
      name
      pullRequests(states: OPEN) {
        totalCount
      }
      releases(last: 1) {
        edges {
          node {
            name
            tagName
            updatedAt
          }
        }
      }
      shortDescriptionHTML
      stargazerCount
      url
    }
  }
`;
