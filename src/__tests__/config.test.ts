import configCommand from "../commands/config";
import {
  asyncCommand,
  createDummyConfig,
  removeConfig,
  testIssues,
  testRepos,
  TOKEN,
} from "./testHelpers";

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

  afterAll(() => {
    removeConfig();
  });
});
