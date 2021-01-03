/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import fs from "fs";
import path from "path";

type SimplifiedPackageType = { version: string };

const isPackageType = (object: any): object is SimplifiedPackageType => {
  return "version" in object;
};

export const getVersion = (): string => {
  const packageStr = fs.readFileSync(
    path.resolve(__dirname, "../../package.json"),
    "utf-8",
  );

  const json = JSON.parse(packageStr);

  if (isPackageType(json)) {
    return json.version;
  }
  return "0.0.0";
};
