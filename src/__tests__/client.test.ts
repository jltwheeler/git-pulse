import { gql } from "graphql-request";

import { mockServer } from "../mocks/server";
import { initClient } from "../client";
import { createDummyConfig, loadYamlConfig, removeConfig } from "./testHelpers";

const testQuery = gql`
  query testInitClient {
    header
  }
`;

describe("Initialises a client correctly", () => {
  beforeAll(() => {
    mockServer.listen();
  });
  beforeEach(() => {
    removeConfig();
  });

  describe("With a token input", () => {
    test("should pass token input into header", async () => {
      const token = "test token";
      const result: { header: string } = await initClient(token).request(
        testQuery,
      );
      expect(result.header).toContain(token);
    });
  });

  describe("Without a token input", () => {
    test("should pass token found in config file into header", async () => {
      createDummyConfig();
      const token = loadYamlConfig().username.authToken;

      const result: { header: string } = await initClient().request(testQuery);
      expect(result.header).toContain(token);
    });
  });

  afterEach(() => {
    removeConfig();
  });

  afterAll(() => {
    mockServer.close();
  });
});
