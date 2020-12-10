import init from "../commands/init";
import { Config } from "../types/types";
import {
  asyncCommand,
  createDummyConfig,
  loadYamlConfig,
  removeConfig,
  testRepos,
} from "./testHelpers";

describe("Initialise command", () => {
  beforeEach(() => {
    removeConfig();
  });

  describe("Repeatted initialise command called", () => {
    test("should let user know a config file already exists if init has already been run", async () => {
      createDummyConfig();

      const command = asyncCommand(init, ["init"]);

      await expect(command).rejects.toThrow(Error);
    });
  });

  describe("Initialise token tests", () => {
    test("should create a config file with default auth key", async () => {
      await asyncCommand(init, ["init"]);

      const result: Config = loadYamlConfig();

      expect(result.username.authToken).toBe("secret");
    });

    test("should create a config file with passed in user auth key", async () => {
      const token = "my_random_token";

      await asyncCommand(init, ["init", "--t", token]);

      const result: Config = loadYamlConfig();

      expect(result.username.authToken).toBe(token);
    });
  });

  describe("Initialise repo tests", () => {
    describe("should add repos to config file", () => {
      test("should placeholder", async () => {
        const args = ["init", "--r"].concat(testRepos);

        const commandPromise = asyncCommand(init, args);

        await commandPromise;
      });
    });
  });

  afterAll(() => {
    removeConfig();
  });
});
