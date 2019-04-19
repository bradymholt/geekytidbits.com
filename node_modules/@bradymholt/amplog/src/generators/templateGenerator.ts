import * as fs from "fs";
import * as path from "path";

import pretty = require("pretty");
import matter = require("gray-matter");
import * as handlebars from "handlebars";
import {
  IConfig,
  ITemplateData,
  IPageConfig,
  IFrontMatter
} from "../interfaces";

export class TemplateGenerator {
  readonly extensionsToInclude = ["hbs"];
  readonly baseTemplateData: ITemplateData;

  // Options
  readonly prettyHtml = true;

  constructor(baseTemplateData: ITemplateData) {
    this.baseTemplateData = baseTemplateData;
  }

  public render(
    sourceDirectory: string,
    destDirectory: string,
    currentConfig: IConfig,
    pages: Array<IPageConfig>
  ) {
    const sourceDirectoryFileNames = fs.readdirSync(sourceDirectory);
    const templateFileNamesToProcess = sourceDirectoryFileNames.filter(f => {
      const extension = path.extname(f).substr(1);
      return (
        !f.startsWith("_") &&
        !fs.lstatSync(path.join(sourceDirectory, f)).isDirectory() &&
        this.extensionsToInclude.includes(extension)
      );
    });

    // Sort pages by filename
    pages.sort((first, second) => {
      return second.filename.localeCompare(first.filename, "en", {
        numeric: true
      });
    });

    for (let currentFileName of templateFileNamesToProcess) {
      this.renderTemplateFile(
        sourceDirectory,
        destDirectory,
        currentFileName,
        currentConfig,
        pages
      );
    }
  }

  private renderTemplateFile(
    sourceDirectory: string,
    destDirectory: string,
    currentFileName: string,
    currentConfig: IConfig,
    pages: Array<IPageConfig>
  ) {
    // TODO: Move this to initializeTemplate but we need it because we need templateContent to extract title
    const { applyTemplate, frontMatter } = this.initializeTemplate(
      path.join(sourceDirectory, currentFileName)
    );

    // TODO: Parse and use front-matter like we do in content generator
    const pageConfig: IPageConfig = Object.assign(
      {
        filename: currentFileName
      },
      currentConfig,
      frontMatter as IFrontMatter // front-mater
    );

    // Apply template
    // TODO: pages seems to be a magic object on template files; should be be standizied into a data container object?
    const templateData = Object.assign(
      <ITemplateData>{},
      this.baseTemplateData,
      pageConfig,
      { pages }
    );

    let templatedOutput = applyTemplate(templateData);
    if (this.prettyHtml) {
      templatedOutput = pretty(templatedOutput, { ocd: true });
    }

    // Write file
    // TODO: config base_path is ignored for template files...I think this is ok but need to make obvious.
    const currentFileExtension = path.extname(currentFileName);
    // Remove extension (i.e. foo.html.hbs => foo.html)
    const outFileNmae = currentFileName.replace(currentFileExtension, "");
    fs.writeFileSync(path.join(destDirectory, outFileNmae), templatedOutput);
  }

  private initializeTemplate(templateFile: string) {
    const templateContent = fs.readFileSync(templateFile, {
      encoding: "utf-8"
    });
    const parsedMatter = matter(templateContent);
    const frontMatter = parsedMatter.data;
    const applyTemplate = handlebars.compile(parsedMatter.content);
    return { applyTemplate, frontMatter };
  }
}
