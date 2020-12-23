/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fs from "fs";

import yaml from "js-yaml";
import chalk from "chalk";

import { Config } from "../types";

export const isObject = (object: any): object is Config => {
  return typeof object === "object";
};

export const isStringArray = (input: any): input is string[] => {
  if (Array.isArray(input))
    return (
      (Array.isArray(input) && typeof input[0] === "string") ||
      (Array.isArray(input) && input[0] instanceof String)
    );
  return false;
};

export const parseConfigYaml = (path: string): Config => {
  const yamlStr: string = fs.readFileSync(path, "utf-8");

  const config = yaml.safeLoad(yamlStr);

  if (!isObject(config)) {
    throw new Error(
      "Something went wrong whilst creating the configuration file",
    );
  }

  return config;
};

export const handleError = (error: any) => {
  if (error instanceof Error) {
    console.log(chalk.red(error.message));
  }
};
