import clear from "clear";

export const safeClear = (): void => {
  if (process.env["NODE_ENV"] !== "test") {
    clear();
  }
};
