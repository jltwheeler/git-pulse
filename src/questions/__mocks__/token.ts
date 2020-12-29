import { TOKEN } from "../../__tests__/testHelpers";

export const tokenQuestion = jest.fn(() => {
  return Promise.resolve({ token: TOKEN });
});
