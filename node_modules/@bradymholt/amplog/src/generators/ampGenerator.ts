import * as fs from "fs";
import * as path from "path";

import pretty = require("pretty");
import * as handlebars from "handlebars";
import ampify = require("@bradymholt/ampify");

import { ITemplateData, IPageConfig } from "../interfaces";

export class AmpGenerator {
  readonly ampPageName = "amp.html";
  readonly ampLayout = "amp.hbs";

  // Options
  readonly prettyHtml = true;

  readonly baseSourceDirectory: string;
  readonly baseDestDirectory: string;

  readonly applyTemplate: handlebars.TemplateDelegate<any>;

  constructor(
    baseSourceDirectory: string,
    baseDestDirectory: string,
    layoutsDirectory: string
  ) {
    this.baseSourceDirectory = baseSourceDirectory;
    this.baseDestDirectory = baseDestDirectory;

    this.applyTemplate = this.initializeTemplate(
      path.join(layoutsDirectory, this.ampLayout)
    );
  }

  public async render(
    page: IPageConfig,
    templateData: ITemplateData
  ) {
    const templatedOutput = this.applyTemplate(templateData);

    let ampOutput = await ampify(templatedOutput, {
      cwd: this.baseSourceDirectory.replace(/\/$/, "")
    });

    if (this.prettyHtml) {
      ampOutput = pretty(ampOutput, { ocd: true });
    }

    fs.writeFileSync(
      path.join(this.baseDestDirectory, page.path, this.ampPageName),
      ampOutput
    );
  }

  // TODO: Dry this up - it is in contentGenerator as well
  private initializeTemplate(templateFile: string) {
    const templateContent = fs.readFileSync(templateFile, {
      encoding: "utf-8"
    });
    const applyTemplate = handlebars.compile(templateContent);
    return applyTemplate;
  }
}
