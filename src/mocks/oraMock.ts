/* eslint-disable @typescript-eslint/no-empty-function */
export default jest.fn().mockImplementation(() => {
  return {
    start: () => {
      return {
        stop: () => {},
      };
    },
  };
});
