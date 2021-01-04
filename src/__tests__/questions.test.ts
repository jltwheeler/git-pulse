import oraMock from "../mocks/oraMock";
import { mockServer } from "../mocks/server";
import { invalidRepo, testIssues, testRepos, TOKEN } from "./testHelpers";
import { validateToken } from "../questions/token";
import { validateRespository } from "../questions/repos";
import { validateIssue } from "../questions/issues";

jest.mock("ora", () => oraMock);

describe("Token questions", () => {
  beforeAll(() => {
    mockServer.listen();
  });

  describe("Token authentication validation", () => {
    test("should return true for valid auth tokens", async () => {
      const result = await validateToken(TOKEN);
      expect(result).toBe(true);
    });

    test("should throw an error, letting the user know that token is invalid", async () => {
      try {
        await validateToken("invalid");
      } catch (err) {
        if (err instanceof Error) {
          expect(err.message).toContain("Error. Please enter a valid auth");
        }
      }
    });

    test("should throw an error when no token is provided", async () => {
      try {
        await validateToken("");
      } catch (err) {
        if (err instanceof Error) {
          expect(err.message).toContain("Error. No token was provided");
        }
      }
    });
  });

  describe("Repo validation", () => {
    test("should return true for valid repo", async () => {
      const result = await validateRespository(testRepos[0]);

      expect(result).toBe(true);
    });

    test("should throw error for an invalid input", async () => {
      try {
        await validateRespository("invalid_url");
      } catch (err) {
        if (err instanceof Error) {
          expect(err.message).toContain("not a valid GitHub repository URL");
        }
      }
    });

    test("should throw error for an invalid repo url", async () => {
      try {
        await validateRespository(invalidRepo);
      } catch (err) {
        if (err instanceof Error) {
          expect(err.message).toContain("not a valid GitHub repository URL");
        }
      }
    });
  });

  describe("Issue validation", () => {
    test("should return true for valid issue", async () => {
      const result = await validateIssue(testIssues[0]);

      expect(result).toBe(true);
    });

    test("should throw error for an invalid input", async () => {
      try {
        await validateIssue("invalid_url");
      } catch (err) {
        if (err instanceof Error) {
          expect(err.message).toContain("not a valid GitHub issue URL");
        }
      }
    });

    test("should throw error for an invalid issue url", async () => {
      try {
        await validateIssue(invalidRepo);
      } catch (err) {
        if (err instanceof Error) {
          expect(err.message).toContain("not a valid GitHub issue URL");
        }
      }
    });
  });

  afterEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => {
    mockServer.close();
  });
});
