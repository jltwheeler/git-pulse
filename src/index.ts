#!/usr/bin/env node

import yargs from "yargs/yargs";

import initCmd from "./commands/init";
import configCommand from "./commands/config";
import checkCommand from "./commands/check";
import { getVersion } from "./utils/getVersion";

yargs(process.argv.slice(2))
  .version(getVersion())
  .usage("Usage: $0 -r string -i string")
  .scriptName("git-pulse")
  .command(initCmd)
  .command(configCommand)
  .command(checkCommand)
  .help()
  .demandCommand()
  .recommendCommands()
  .strict()
  .parse();
