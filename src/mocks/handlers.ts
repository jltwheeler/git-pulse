import { graphql } from "msw";

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
];
