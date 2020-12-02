#!/usr/bin/env node

import yargs from "yargs/yargs";

import initCmd from "./commands/init";

yargs(process.argv.slice(2))
  .scriptName("git-pulse")
  .usage("Usage: $0 -r string -i string")
  .command("init", "initialises a user config file", initCmd)
  .help().argv;
