import path from "path";
import os from "os";

export const configTemplateName = "config.yml";
export const configOutputName = "git-pulse.conf.yml";
export const configDir: string = path.resolve(os.homedir(), ".git-pulse");
