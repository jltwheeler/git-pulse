import fs from "fs";
import { Config } from "../types/types";
import { configDir, configOutputPath } from "../utils/constants";
import { parseConfigYaml } from "../utils/parsers";

export const removeConfig = (): void => {
  if (fs.existsSync(configDir)) {
    fs.rmdirSync(configDir, { recursive: true });
  }
};

export const loadYamlConfig = (): Config => {
  return parseConfigYaml(configOutputPath);
};
