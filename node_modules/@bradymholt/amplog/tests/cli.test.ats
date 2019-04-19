import { init } from "../src/cli";
import { copySync } from "fs-extra";
import * as path from "path";

jest.mock("fs-extra");

describe("init", () => {
  it("errors when no targetDirectoryName is provided", () => {
    const mockError = jest
      .spyOn(console, "error")
      .mockImplementation(((message: string) => null) as any);
    const mockExit = jest
      .spyOn(process, "exit")
      .mockImplementation(((code: number) => null) as any);

    try {
      const cli = init(process.cwd(), ["init"]);
      cli.run();
      expect(mockError).toHaveBeenCalled();
      expect(mockExit).toHaveBeenCalledWith(1);
    } finally {
      mockError.mockReset();
      mockExit.mockReset();
    }
  });

  it("copies scaffold to init destination directory", () => {
    const cwd = process.cwd();
    const destDirectoryName = "fake-dir";
    const cli = init(cwd, ["init", destDirectoryName]);
    cli.run();
    expect(copySync).toHaveBeenCalledWith(
      path.join(cwd, "scaffold"),
      path.join(cwd, destDirectoryName)
    );
  });
});
