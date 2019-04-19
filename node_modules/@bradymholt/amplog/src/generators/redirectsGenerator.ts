import { IConfig } from "../interfaces";
import * as fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";
import * as handlebars from "handlebars";

export class RedirectsGenerator {
  readonly redirectLayoutName = "redirect.hbs";

  public render(
    config: IConfig,
    destDirectory: string,
    layoutsDirectory: string
  ) {
    if (!config.redirects) {
      return;
    }

    const layoutFile = path.join(layoutsDirectory, this.redirectLayoutName);
    if (!fse.existsSync(layoutFile)) {
      throw Error(`Layout file not found: ${layoutFile}`);
    }

    const templateContent = fs.readFileSync(layoutFile, { encoding: "utf-8" });
    const applyTemplate = handlebars.compile(templateContent);

    for (let redirectPath in config.redirects) {
      const output = applyTemplate({ path: config.redirects[redirectPath] });
      const outFile = path.join(destDirectory, redirectPath, !redirectPath.match(/\.html?/) ? "/index.html" : "");
      fse.ensureFileSync(outFile);
      fs.writeFileSync(outFile, output);
    }
  }
}
