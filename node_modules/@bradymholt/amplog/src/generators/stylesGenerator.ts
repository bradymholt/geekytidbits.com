import * as fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";
import * as sass from "node-sass";
import { Options } from "node-sass";
import { IStyle } from "../interfaces";

export class StylesGenerator {
  readonly extensionsToInclude = ["scss", "sass", "css"];
  readonly outFileExtension = "css";
  readonly outputStyle = "compressed";

  public render(sourceDirectory: string, destDirectory: string) {
    const styles: Array<IStyle> = [];
    const baseDirFileNames = fs.readdirSync(sourceDirectory);
    const cssFileNamesToProcess = baseDirFileNames.filter(f => {
      const extension = path.extname(f).substr(1);
      return (
        !f.startsWith("_") &&
        !fs.lstatSync(path.join(sourceDirectory, f)).isDirectory() &&
        this.extensionsToInclude.includes(extension)
      );
    });

    for (let currentFileName of cssFileNamesToProcess) {
      const currentFile = path.join(sourceDirectory, currentFileName);
      const content = sass
        .renderSync({
          file: currentFile,
          outputStyle: this.outputStyle
        })
        .css.toString();

      const fileName = path.parse(currentFile).name;
      const outFileName = `${fileName}.${this.outFileExtension}`;

      fse.emptyDirSync(destDirectory);
      fs.writeFileSync(path.join(destDirectory, outFileName), content);

      // TODO: Also include path to rendered file
      // TODO: What if 2 styles have the same name
      const style = <IStyle>{
        name: path.parse(currentFileName).name,
        content
      };
      styles.push(style);
    }

    const subDirectoryNames = baseDirFileNames.filter(f => {
      return fs.statSync(path.join(sourceDirectory, f)).isDirectory();
    });

    for (let subDirectoryName of subDirectoryNames) {
      const subDirectorySource = path.join(sourceDirectory, subDirectoryName);
      const subDirectoryDest = path.join(destDirectory, subDirectoryName);
      const subDirectoryStyles = this.render(
        subDirectorySource,
        subDirectoryDest
      );
      styles.push(...subDirectoryStyles);
    }

    return styles;
  }
}
