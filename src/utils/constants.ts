import path from "path";
import os from "os";

const dirName =
  process.env["NODE_ENV"] === "test" ? ".git-pulse-test" : ".git-pulse";

export const configTemplateName = "config.yml";
export const configOutputName = "git-pulse.conf.yml";
export const configDir: string = path.resolve(os.homedir(), dirName);
export const configOutputPath: string = path.resolve(
  configDir,
  configOutputName,
);
export const GITHUB_API_ENDPOINT = "https://api.github.com/graphql";
export const repoRegex = RegExp(/(?<=github.com\/)(.+\/.+$)/);
export const dateRegex = RegExp(/\d\d\d\d-\d\d-\d\d/);
export const SLEEP_TIME = process.env["NODE_ENV"] === "test" ? 0 : 500;
