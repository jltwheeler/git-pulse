/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Config } from "../types/types";

export const isObject = (object: any): object is Config => {
  return typeof object === "object";
};
