import * as fse from "fs-extra";
import * as path from "path";

export class AssetGenerator {
  readonly ignoreExtensions = ["scss", "sass", "css", "md", "hbs"];

  public render(sourceDirectory: string, destDirectory: string) {
    fse.copySync(sourceDirectory, destDirectory, {
      filter: (src: string, dest: string) => {
        const name = path.parse(src).name;
        const extension = path.parse(src).ext.substr(1);
        return (
          !name.startsWith("_") && !this.ignoreExtensions.includes(extension)
        );
      }
    });
  }
}
