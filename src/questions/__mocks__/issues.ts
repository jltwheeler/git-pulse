import { testIssues } from "../../__tests__/testHelpers";

export const initIssuesQuestion = jest.fn(() => {
  return Promise.resolve({ addIssues: true });
});

export const addIssueQuestions = jest.fn(() => {
  return Promise.resolve(testIssues);
});
