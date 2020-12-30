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

  afterAll(() => {
    removeConfig();
  });
});
