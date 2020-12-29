import {
  asyncCommand,
  createDummyConfig,
  loadYamlConfig,
  removeConfig,
  testRepos,
  testIssues,
  TOKEN,
} from "./testHelpers";
import { Config } from "../types";
import init from "../commands/init";
import { mockServer } from "../mocks/server";
import * as questionIssues from "../questions/issues";
import * as questionRepos from "../questions/repos";

jest.mock("../questions/issues");
jest.mock("../questions/repos");
jest.mock("../questions/token");

describe("Initialise command", () => {
  beforeAll(() => {
    mockServer.listen();
  });

  beforeEach(() => {
    removeConfig();
  });

  describe("Call init command whilst already having a config file", () => {
    test("should let user know a config file already exists if init has already been run", async () => {
      createDummyConfig();

      const command = asyncCommand(init, ["init"]);

      await expect(command).rejects.toThrow(Error);
    });
  });

  describe("Generation of config file", () => {
    test("should generate config file with valid issues and repos", async () => {
      await asyncCommand(init, ["init"]);

      const result: Config = loadYamlConfig();

      expect(result.username.authToken).toBe(TOKEN);
      expect(result.issues).toEqual(testIssues);
      expect(result.repos).toEqual(testRepos);
    });

    test("should generate config file with valid repos only", async () => {
      (questionIssues.initIssuesQuestion as jest.Mock).mockImplementationOnce(
        () => Promise.resolve({ addIssues: false }),
      );

      await asyncCommand(init, ["init"]);

      const result: Config = loadYamlConfig();

      expect(result.username.authToken).toBe(TOKEN);
      expect(result.repos).toEqual(testRepos);
    });

    test("should generate config file with valid issues only", async () => {
      (questionRepos.initReposQuestion as jest.Mock).mockImplementationOnce(
        () => Promise.resolve({ addRepos: false }),
      );

      await asyncCommand(init, ["init"]);

      const result: Config = loadYamlConfig();

      expect(result.username.authToken).toBe(TOKEN);
      expect(result.issues).toEqual(testIssues);
    });
  });

  describe("Dummy file", () => {
    createDummyConfig();
  });

  afterEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => {
    removeConfig();
    mockServer.close();
  });
});
