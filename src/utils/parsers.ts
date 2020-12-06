/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fs from "fs";

import yaml from "js-yaml";

import { Config } from "../types/types";

export const isObject = (object: any): object is Config => {
  return typeof object === "object";
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
