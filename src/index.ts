#!/usr/bin/env node

import yargs from "yargs/yargs";

yargs(process.argv.slice(2))
  .scriptName("git-pulse")
  .usage("Usage: $0 -r string -i string")
  .command("init", "initialises a user config file", () => {
    console.log("initial commit");
  }).argv;
