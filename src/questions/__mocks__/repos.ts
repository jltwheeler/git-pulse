import { testRepos } from "../../__tests__/testHelpers";

export const initReposQuestion = jest.fn(() => {
  return Promise.resolve({ addRepos: true });
});

export const addRepoQuestions = jest.fn(() => {
  return Promise.resolve(testRepos);
});
