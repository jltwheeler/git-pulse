import { validateToken } from "../questions/token";
import { mockServer } from "../mocks/server";
import { TOKEN } from "./testHelpers";

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
      const result = await validateToken("invalid");
      expect(result).toContain("Error. Please enter a valid auth");
    });

    test("should throw an error when no token is provided", async () => {
      const result = await validateToken("");
      expect(result).toContain("Error. No token was provided");
    });
  });

  afterEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => {
    mockServer.close();
  });
});
