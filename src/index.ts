#!/usr/bin/env node

import yargs from "yargs/yargs";

import initCmd from "./commands/init";
import configCommand from "./commands/config";
import fetchCommand from "./commands/fetch";
import { getVersion } from "./utils/getVersion";

yargs(process.argv.slice(2))
  .version(getVersion())
  .usage("Usage: $0 -r string -i string")
  .scriptName("git-pulse")
  .command(initCmd)
  .command(configCommand)
  .command(fetchCommand)
  .help()
  .demandCommand()
  .recommendCommands()
  .strict()
  .parse();
