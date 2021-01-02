import { CommandModule } from "yargs";
// import chalk from "chalk";

import { configOutputPath } from "../utils/constants";
import { Config } from "../types";
import { checkConfigExists } from "../utils/checkConfigExists";
import { handleError, parseConfigYaml } from "../utils/parsers";

const initCommand: CommandModule = {
  command: "fetch",
  describe: "Fetches information about tracked repos and / or issues.",
  builder: {
    repo: {
      alias: "r",
      describe: "Add a repository by passing in the full repository URL",
      boolean: false,
    },
    issue: {
      alias: "i",
      describe: "Add an issue by passing in the full issue URL",
      boolean: false,
    },
    all: {
      alias: "a",
      describe: "",
      boolean: false,
    },
  },
  handler: (args) => {
    try {
      checkConfigExists();
    } catch (error) {
      handleError(error);
      return;
    }

    try {
      if (!args.a && !args.i && !args.r) {
        throw new Error(
          "Error. Please specify if you wish to fetch info on a repo (-r), issue (-i) or both (-a).",
        );
      }

      const config: Config = parseConfigYaml(configOutputPath);
      console.log(config.issues);
    } catch (error) {
      handleError(error);
    }
  },
};

export default initCommand;
