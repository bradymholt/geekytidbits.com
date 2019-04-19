import { loadConfigFile } from "../src/configHelper";
import * as fse from "fs-extra";
import * as fs from "fs";

jest.mock("fs-extra");
jest.mock("fs");

describe("loadConfigFile", () => {
  it("returns empty object if file does not exist", () => {
    expect(loadConfigFile("not-a-real-folder")).toEqual({});
  });

  it("foo", () => {
    (<any>fse.existsSync).mockReturnValueOnce(true);
    (<any>fs.readFileSync).mockReturnValueOnce("title: This is a test title");

    expect(loadConfigFile("not-a-real-folder")).toEqual({ title: "This is a test title" });

    jest.unmock("fs-extra");
    jest.unmock("fs");
  });
});
