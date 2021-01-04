#!/usr/bin/env node

import yargs from "yargs/yargs";

import { checkCommand, configCommand, initCommand } from "./commands";
import { getVersion } from "./utils/getVersion";

yargs(process.argv.slice(2))
  .version(getVersion())
  .usage("Usage: $0 -r string -i string")
  .scriptName("git-pulse")
  .command(initCommand)
  .command(configCommand)
  .command(checkCommand)
  .help()
  .demandCommand()
  .recommendCommands()
  .strict()
  .parse();
