import yargs from "yargs/yargs";

import init from "../commands/init";
import { Config } from "../types/types";
import { loadYamlConfig, removeConfig } from "./testHelpers";

describe("Initialise command", () => {
  describe("Initialise without unrequired args", () => {
    beforeEach(() => {
      removeConfig();
    });
    test("should create a config file i with default auth key", () => {
      yargs(["init"]).command(init).argv;

      const result: Config = loadYamlConfig();

      expect(result.username.authToken).toBe("secret");
    });
  });
});
