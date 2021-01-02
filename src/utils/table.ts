import chalk from "chalk";

export const generateHeader = (items: string[]): { head: string[] } => {
  const headerLabels: string[] = items.map((v) => chalk.green(v));
  return {
    head: headerLabels,
  };
};
