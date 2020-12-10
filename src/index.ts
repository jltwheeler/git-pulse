#!/usr/bin/env node

import yargs from "yargs/yargs";
import chalk from "chalk";

import initCmd from "./commands/init";

yargs(process.argv.slice(2))
  .version(process.env?.npm_package_version || "0.0.0")
  .scriptName("git-pulse")
  .usage("Usage: $0 -r string -i string")
  .command(initCmd)
  .fail((_, err) => console.log(chalk.red(err)))
  .help()
  .parse();
