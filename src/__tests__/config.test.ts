import configCommand from "../commands/config";
import {
  asyncCommand,
  createDummyConfig,
  loadYamlConfig,
  removeConfig,
  testIssues,
  testRepos,
  TOKEN,
} from "./testHelpers";

import * as questionTokens from "../questions/token";
import { Config } from "../types";

jest.mock("../questions/token");

const spyConsole = jest.spyOn(console, "log");

describe("Config command", () => {
  beforeEach(() => {
    removeConfig();
    spyConsole.mockReset();
  });

  describe("ls sub command", () => {
    test("should console log the config information as tables", async () => {
      createDummyConfig();
      await asyncCommand(configCommand, ["config", "ls"]);

      expect(spyConsole.mock.calls).toHaveLength(3);

      expect(spyConsole.mock.calls[0][0]).toContain(TOKEN);
      testIssues.forEach((item) => {
        expect(spyConsole.mock.calls[1][0]).toContain(item);
      });
      testRepos.forEach((item) => {
        expect(spyConsole.mock.calls[2][0]).toContain(item);
      });
    });

    test("should throw an error if no config file exists", async () => {
      await asyncCommand(configCommand, ["config", "ls"]);
      expect(spyConsole.mock.calls[0][0]).toContain(
        "configuration file no longer exists",
      );
    });

    test("should only list repos with an -r flag", async () => {
      createDummyConfig();
      await asyncCommand(configCommand, ["config", "ls", "-r"]);

      expect(spyConsole.mock.calls).toHaveLength(1);
      testRepos.forEach((item) => {
        expect(spyConsole.mock.calls[0][0]).toContain(item);
      });
    });

    test("should only list issues with an -i flag", async () => {
      createDummyConfig();
      await asyncCommand(configCommand, ["config", "ls", "-i"]);

      expect(spyConsole.mock.calls).toHaveLength(1);
      testIssues.forEach((item) => {
        expect(spyConsole.mock.calls[0][0]).toContain(item);
      });
    });
  });

  describe("token sub command", () => {
    test("should throw an error if no config file exists", async () => {
      await asyncCommand(configCommand, ["config", "token"]);
      expect(spyConsole.mock.calls[0][0]).toContain(
        "configuration file no longer exists",
      );
    });

    test("should update config file with a valid GitHub token", async () => {
      createDummyConfig();
      const token = "test token";

      (questionTokens.tokenQuestion as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ token }),
      );

      await asyncCommand(configCommand, ["config", "token"]);

      const config: Config = loadYamlConfig();
      expect(config.username.authToken).toBe(token);
    });
  });

  describe("remove sub command", () => {
    beforeEach(() => {
      createDummyConfig();
    });

    test("should throw an error if no arguements are provided", async () => {
      await asyncCommand(configCommand, ["config", "rm"]);

      expect(spyConsole.mock.calls[0][0]).toContain(
        "Error. Please specify a repo (-r) or issue (-i) to remove",
      );
    });

    test("should throw an error if no value is given to the issue arg", async () => {
      await asyncCommand(configCommand, ["config", "rm", "-i"]);

      expect(spyConsole.mock.calls[0][0]).toContain(
        "No issue number was given",
      );
    });

    test("should throw an error if no value is given to the repo arg", async () => {
      await asyncCommand(configCommand, ["config", "rm", "-r"]);

      expect(spyConsole.mock.calls[0][0]).toContain("No repo number was given");
    });

    test("should throw an error if can't find issue number", async () => {
      await asyncCommand(configCommand, ["config", "rm", "-i", "1000"]);

      expect(spyConsole.mock.calls[0][0]).toContain(
        "Could not find issue 1000",
      );
    });

    test("should throw an error if can't find repo number", async () => {
      await asyncCommand(configCommand, ["config", "rm", "-r", "2000"]);

      expect(spyConsole.mock.calls[0][0]).toContain("Could not find repo 2000");
    });

    test("should correctly update config with removed issue", async () => {
      const removedIssue = testIssues[0];
      await asyncCommand(configCommand, ["config", "rm", "-i", "1"]);
      const config: Config = loadYamlConfig();

      expect(config.issues.length).toBe(testIssues.length - 1);
      expect(
        config.issues.find((item) => item === removedIssue),
      ).toBeUndefined();
    });

    test("should correctly update config with removed repo", async () => {
      const removedRepo = testRepos[0];
      await asyncCommand(configCommand, ["config", "rm", "-r", "1"]);
      const config: Config = loadYamlConfig();

      expect(config.repos.length).toBe(testRepos.length - 1);
      expect(config.repos.find((item) => item === removedRepo)).toBeUndefined();
    });
  });

  afterAll(() => {
    removeConfig();
  });
});
