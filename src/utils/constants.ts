import path from "path";
import os from "os";

export const configTemplateName = "config.yml";
export const configOutputName = "git-pulse.conf.yml";
export const configDir: string = path.resolve(os.homedir(), ".git-pulse");
export const configOutputPath: string = path.resolve(
  configDir,
  configOutputName,
);
export const GITHUB_API_ENDPOINT = "https://api.github.com/graphql";
export const repoRegex = RegExp(/(?<=github.com\/)(.+\/.+$)/);
