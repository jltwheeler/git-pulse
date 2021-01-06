#!/usr/bin/env node

import chalk from "chalk";
import yargs from "yargs/yargs";

import { checkCommand, configCommand, initCommand } from "./commands";
import { getVersion } from "./utils/getVersion";

yargs(process.argv.slice(2))
  .version(getVersion())
  .usage(
    `Usage: gpulse COMMAND\n\nHead to ${chalk.blueBright(
      "https://github.com/jltwheeler/git-pulse",
    )} to read the full ${chalk.blueBright(
      "git-pulse",
    )} documentation and guide.`,
  )
  .scriptName("gpulse")
  .command(initCommand)
  .command(configCommand)
  .command(checkCommand)
  .demandCommand(1, "")
  .help()
  .parse();
