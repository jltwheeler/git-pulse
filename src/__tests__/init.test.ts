import yargs from "yargs/yargs";

import init from "../commands/init";
import { Config } from "../types/types";
import { loadYamlConfig, removeConfig } from "./testHelpers";

describe("Initialise command", () => {
  beforeEach(() => {
    removeConfig();
  });

  describe("Repeatted initialise command called", () => {
    test("should let user know a config file already exists if init has already been run", () => {
      yargs(["init"]).command(init).argv;

      const secondInitcall = () => {
        yargs(["init"]).command(init).argv;
      };

      expect(secondInitcall).toThrow(Error);
    });
  });

  describe("Initialise token tests", () => {
    test("should create a config file with default auth key", () => {
      yargs(["init"]).command(init).argv;

      const result: Config = loadYamlConfig();

      expect(result.username.authToken).toBe("secret");
    });

    test("should create a config file with passed in user auth key", () => {
      const token = "my_random_token";
      yargs(["init", "--t", token]).command(init).argv;

      const result: Config = loadYamlConfig();

      expect(result.username.authToken).toBe(token);
    });
  });

  describe("Initialise repo tests", () => {
    describe("should add repos to config file", () => {
      test("should placeholder", () => {
        expect(1).toBe(1);
      });
    });
  });

  // afterAll(() => {
  //   removeConfig();
  // });
});
