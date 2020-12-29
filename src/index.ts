#!/usr/bin/env node

import yargs from "yargs/yargs";
// import chalk from "chalk";

import initCmd from "./commands/init";
import configCommand from "./commands/config";
import { getVersion } from "./utils/getVersion";

yargs(process.argv.slice(2))
  .version(getVersion())
  .usage("Usage: $0 -r string -i string")
  .scriptName("git-pulse")
  .command(initCmd)
  .command(configCommand)
  .help()
  .demandCommand()
  .recommendCommands()
  .strict()
  // .fail((_, error) => console.log(chalk.red(error)))
  .parse();
