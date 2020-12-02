import fs from "fs";
import path from "path";
import os from "os";

// import yaml from "js-yaml";

import { configName } from "../utils/constants";

const generateConfigFile = (configDir: string): void => {
  fs.mkdirSync(configDir);

  const yamlString = fs.readFileSync(
    path.resolve(__dirname, "../templates/config.yml"),
    "utf-8",
  );

  console.log(path.resolve(configDir, configName));

  fs.writeFileSync(path.resolve(configDir, configName), yamlString);
};

const command = (): void => {
  const configDir: string = path.resolve(os.homedir(), ".git-pulse");

  if (!fs.existsSync(configDir)) {
    generateConfigFile(configDir);
    console.log("A ");
  }
};

export default command;
