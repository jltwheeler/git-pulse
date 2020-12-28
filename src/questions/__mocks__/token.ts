export const tokenQuestion = jest.fn(() => {
  return Promise.resolve({ token: "my_token" });
});
