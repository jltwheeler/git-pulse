import fetchCommand from "../commands/fetch";
import { asyncCommand, createDummyConfig, removeConfig } from "./testHelpers";
import { mockServer } from "../mocks/server";

const spyConsole = jest.spyOn(console, "log");

describe("Fetch command", () => {
  beforeAll(() => {
    mockServer.listen();
  });

  beforeEach(() => {
    removeConfig();
    spyConsole.mockReset();
  });

  describe("Run without existing config file", () => {
    test("should throw error and notify user of the error.", async () => {
      await asyncCommand(fetchCommand, ["fetch"]);

      expect(spyConsole.mock.calls[0][0]).toContain(
        "configuration file no longer exists",
      );
    });
  });

  describe("Run without args", () => {
    test("should throw error and notify user of the error.", async () => {
      createDummyConfig();
      await asyncCommand(fetchCommand, ["fetch"]);

      expect(spyConsole.mock.calls[0][0]).toContain(
        "specify if you wish to fetch info on a",
      );
    });
  });

  afterAll(() => {
    mockServer.close();
    removeConfig();
  });
});
