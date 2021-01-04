import checkCommand, {
  generateIssueTableData,
  generateRepoTableData,
  IssueResult,
  RepoResult,
} from "../commands/check";
import {
  asyncCommand,
  createDummyConfig,
  fetchIssuesResult,
  fetchReposResult,
  issueTableVals,
  removeConfig,
  repoTableValsEmpty,
  repoTableValsFull,
} from "./testHelpers";
import { mockServer } from "../mocks/server";
import stripAnsi from "strip-ansi";
import terminalLink from "terminal-link";
import chalk from "chalk";

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
      await asyncCommand(checkCommand, ["check"]);

      expect(spyConsole.mock.calls[0][0]).toContain(
        "configuration file no longer exists",
      );
    });
  });

  describe("Run without args", () => {
    test("should throw error and notify user of the error.", async () => {
      createDummyConfig();
      await asyncCommand(checkCommand, ["check"]);

      expect(spyConsole.mock.calls[0][0]).toContain(
        "specify if you wish to check info on a",
      );
    });
  });

  describe("Generate repo table data", () => {
    test("should return correct values array", () => {
      const input: RepoResult = fetchReposResult;

      const result = generateRepoTableData(input);
      const output = result.map((row) =>
        row.map((v) => {
          if (!v.includes("Link")) {
            return stripAnsi(v);
          }

          return v;
        }),
      );

      const link = chalk.blueBright(
        terminalLink("Link to v4.1.3", "http://example.com"),
      );
      const expected = [
        [
          "microsoft/TypeScript\n★: 67433\nOpen PR's: 263\nForks: 8944\nOpen Issues: 4700",
          "v4.1.3",
          "2020-12-16",
          `test release\n-----------------------\n${link}`,
        ],
        [
          "microsoft/test\n★: 1\nOpen PR's: 500\nForks: 100\nOpen Issues: 2000",
          "v1.0.0",
          "N/A",
          "N/A",
        ],
      ];
      expect(output).toEqual(expected);
    });
  });

  describe("Generate issue table data", () => {
    test("should return correct values array", () => {
      const input: IssueResult = fetchIssuesResult;

      const result = generateIssueTableData(input);
      const output = result.map((row) =>
        row.map((v) => {
          if (!v.includes("Link")) {
            return stripAnsi(v);
          }

          return v;
        }),
      );

      const link = chalk.blueBright(
        terminalLink("Link to issue", "http://example.com"),
      );

      const expected = [
        [
          "CesiumGS / gltf-pipeline",
          `Title X\n-------------\n${link}`,
          "OPEN",
          "2020-07-08",
          "2020-07-08",
          "Total: 10\nNew: 10",
          "Total: 10\nNew: 10",
        ],
      ];
      expect(output).toEqual(expected);
    });
  });

  describe("Display repo table", () => {
    test("should correctly displays repo data as table", async () => {
      createDummyConfig();

      await asyncCommand(checkCommand, ["check", "-r"]);

      repoTableValsFull.forEach((item) => {
        expect(spyConsole.mock.calls[0][0]).toContain(item);
      });

      repoTableValsEmpty.forEach((item) => {
        expect(spyConsole.mock.calls[0][0]).toContain(item);
      });
    });
  });

  describe("Display issue table", () => {
    test("should correctly displays issue data as table", async () => {
      createDummyConfig();

      await asyncCommand(checkCommand, ["check", "-i"]);

      issueTableVals.forEach((item) => {
        expect(spyConsole.mock.calls[0][0]).toContain(item);
      });
    });
  });

  describe("Display issue and repo tables", () => {
    test("should correctly displays both the issue and repo tables", async () => {
      createDummyConfig();

      await asyncCommand(checkCommand, ["check", "-a"]);

      repoTableValsFull.forEach((item) => {
        expect(spyConsole.mock.calls[0][0]).toContain(item);
      });
      repoTableValsEmpty.forEach((item) => {
        expect(spyConsole.mock.calls[0][0]).toContain(item);
      });
      issueTableVals.forEach((item) => {
        expect(spyConsole.mock.calls[1][0]).toContain(item);
      });
    });
  });

  afterAll(() => {
    mockServer.close();
    removeConfig();
  });
});
