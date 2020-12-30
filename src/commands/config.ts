import { CommandModule } from "yargs";
import CliTable3 from "cli-table3";

import { checkConfigExists } from "../utils/checkConfigExists";
import { configOutputPath } from "../utils/constants";
import { handleError, parseConfigYaml } from "../utils/parsers";
import { generateHeader } from "../utils/table";
import { Config } from "../types";

const lsSubCommand: CommandModule = {
  command: "ls",
  describe: "Lists the current repos and issues that are being tracked.",
  handler: () => {
    try {
      checkConfigExists();
    } catch (error) {
      handleError(error);
      return;
    }

    const config: Config = parseConfigYaml(configOutputPath);

    const tokenTable = new CliTable3(
      generateHeader([
        "GitHub authentication token",
        config.username.authToken,
      ]),
    );
    const issueTable = new CliTable3(generateHeader(["Num", "Issue"]));
    const repoTable = new CliTable3(generateHeader(["Num", "Repository"]));

    config.issues.forEach((v, idx) => issueTable.push([idx + 1, v]));
    config.repos.forEach((v, idx) => repoTable.push([idx + 1, v]));

    console.log(tokenTable.toString());
    console.log(issueTable.toString());
    console.log(repoTable.toString());
  },
};

const configCommand: CommandModule = {
  command: "config",
  describe: "Manage git-pulse configs.",
  builder: (yargs) => {
    return yargs.command(lsSubCommand).demandCommand();
  },
  handler: () => {
    //
  },
};

export default configCommand;
