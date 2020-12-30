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
  });

  afterAll(() => {
    // removeConfig();
  });
});
