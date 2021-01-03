import { gql } from "graphql-request";
import { repoRegex } from "./utils/constants";

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

export const generateFetchReposQuery = (repos: string[]): string => {
  const queries = repos.map((repo, idx) => {
    const result = repoRegex.exec(repo);
    if (result) {
      const [owner, name] = result[0].split("/");
      return `
        fetchRepo${idx}: repository(name: "${name}", owner: "${owner}") {
          forkCount
          issues(states: OPEN) {
            totalCount
          }
          name
          owner {
            login
          }
          pullRequests(states: OPEN) {
            totalCount
          }
          refs(refPrefix:"refs/tags/", last:1) {
            nodes {
              name
            }
          }
          releases(last: 1) {
            edges {
              node {
                name
                shortDescriptionHTML
                tagName
                updatedAt
                url
              }
            }
          }
          shortDescriptionHTML
          stargazerCount
          url
        }
        `;
    }
    return "";
  });

  const query = gql`
    query fetchRepos {
      ${queries.join("\n")}
    }
  `;

  return query;
};
