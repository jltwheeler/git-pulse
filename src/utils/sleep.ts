export const sleep = (amount: number): Promise<boolean> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(true);
    }, amount);
  });
};
