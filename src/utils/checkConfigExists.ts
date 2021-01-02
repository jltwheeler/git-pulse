import fs from "fs";
import { configOutputPath } from "./constants";

export const checkConfigExists = (): void => {
  if (!fs.existsSync(configOutputPath)) {
    throw new Error(
      "Error. It appears your configuration file no longer exists. Please run 'git-pulse init' to generate a new one.",
    );
  }
};
