import { CommandModule } from "yargs";

const lsSubCommand: CommandModule = {
  command: "ls",
  describe: "Lists the current repos and issues that are being tracked.",
  handler: () => {
    console.log("ls");
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
