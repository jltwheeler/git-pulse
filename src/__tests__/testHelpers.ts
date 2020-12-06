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

export const testRepos = [
  "https://github.com/Microsoft/TypeScript",
  "https://github.com/facebook/create-react-app",
  "https://github.com/docker/cli",
  "https://github.com/docker/compose",
];

export const testIssues = [
  "https://github.com/CesiumGS/gltf-pipeline/issues/549",
  "https://github.com/vercel/swr/issues/781",
  "https://github.com/mui-org/material-ui/issues/16947",
];
