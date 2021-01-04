import { graphql } from "msw";
import { fetchIssuesResult, fetchReposResult } from "../__tests__/testHelpers";

export const handlers = [
  graphql.query("userAuth", (req, res, ctx) => {
    const headers = req.headers.getAllHeaders();

    if ("authorization" in headers) {
      if (headers.authorization.includes("invalid")) {
        throw new Error();
      } else {
        return res(
          ctx.data({
            rateLimit: {
              limit: 5000,
            },
          }),
        );
      }
    }

    throw new Error();
  }),
  graphql.query("testInitClient", (req, res, ctx) => {
    const headers = req.headers.getAllHeaders();
    return res(
      ctx.data({
        header: headers.authorization,
      }),
    );
  }),
  graphql.query("validateRepo", (req, res, ctx) => {
    if ("owner" in req.variables) {
      if (req.variables.owner === "invalid") {
        throw new Error();
      } else {
        return res(
          ctx.data({
            repository: {
              url: "testurl",
            },
          }),
        );
      }
    }

    throw new Error();
  }),
  graphql.query("validateIssue", (req, res, ctx) => {
    if ("owner" in req.variables) {
      if (req.variables.owner === "invalid") {
        throw new Error();
      } else {
        return res(
          ctx.data({
            repository: {
              issue: {
                title: "test issue",
              },
            },
          }),
        );
      }
    }

    throw new Error();
  }),
  graphql.query("fetchRepos", (_req, res, ctx) => {
    return res(ctx.data(fetchReposResult));
  }),
  graphql.query("fetchIssues", (_req, res, ctx) => {
    return res(ctx.data(fetchIssuesResult));
  }),
];
