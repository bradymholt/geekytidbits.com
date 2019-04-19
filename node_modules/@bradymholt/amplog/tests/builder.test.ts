import { Builder } from "../src/builder";
import * as fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";
import { getCurrentDateInISOFormat } from "../src/dateHelper";

describe("start", () => {
  it("builds scaffold correct", () => {
    const source = path.join(__dirname, "../scaffold/");
    const dest = path.join(__dirname, "./tmp_scaffold");
    fse.emptyDirSync(dest);
    fse.copySync(source, dest);
    fse.renameSync(
      path.join(dest, "content/posts/YYYY-MM-DD-my-first-post.md"),
      path.join(
        dest,
        `content/posts/${getCurrentDateInISOFormat()}-my-first-post.md`
      )
    );
    new Builder(dest).start();

    const aboutMeContent = fs.readFileSync(path.join(dest, "dist/about-me/index.html"), { encoding: "utf-8"});
    expect(aboutMeContent.includes("Hello there. My name is Brady Holt and I like to blog.")).toBeTruthy();
  });
});
