#!/usr/bin/env node

import yargs from "yargs/yargs";
import chalk from "chalk";

import { version } from "../package.json";
import initCmd from "./commands/init";

yargs(process.argv.slice(2))
  .version(version || "0.0.0")
  .scriptName("git-pulse")
  .usage("Usage: $0 -r string -i string")
  .command(initCmd)
  .fail((_, error) => console.log(chalk.red(error)))
  .help()
  .parse();
