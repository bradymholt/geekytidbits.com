import * as fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";

import * as handlebars from "handlebars";
import marked = require("marked");
import pretty = require("pretty");
import matter = require("gray-matter");
import prismjs = require("prismjs");

import registerHbsHelpers from "../hbs-helpers";
import { loadConfigFile } from "../configHelper";
import * as interfaces from "../interfaces";
import { TemplateGenerator } from "./templateGenerator";
import { AmpGenerator } from "./ampGenerator";

export class ContentGenerator {
  readonly baseConfig: interfaces.IConfig;
  readonly layoutsDirectory: string;
  readonly styles: Array<interfaces.IStyle>;
  readonly contentPageName = "index.html";
  readonly contentExtensionsToInclude = ["md"];
  readonly defaultPageLayout = "page.hbs";

  // Options
  readonly renderAmpPages = true;
  readonly prettyHtml = true;
  readonly codeHighlight = true;

  initialized = false;
  baseSourceDirectory = "";
  baseDestDirectory = "";
  baseTemplateData: interfaces.ITemplateData | null = null;
  templateGenerator: TemplateGenerator | null = null;
  ampGenerator: AmpGenerator | null = null;
  readonly markedRender: marked.Renderer;
  readonly markedHighlighter: ((code: string, lang: string) => string) | null;

  constructor(
    baseConfig: interfaces.IConfig,
    styles: Array<interfaces.IStyle>,
    layoutsDirectory: string
  ) {
    this.baseConfig = baseConfig;
    this.styles = styles;
    this.layoutsDirectory = layoutsDirectory;

    this.markedRender = this.getMarkedRender();
    this.markedHighlighter = this.codeHighlight ? this.prismHighlighter : null;
  }

  protected initialize(sourceDirectory: string, destDirectory: string) {
    if (!this.initialized) {
      this.registerTemplatePartials(this.layoutsDirectory);
      registerHbsHelpers();

      this.baseSourceDirectory = sourceDirectory;
      this.baseDestDirectory = destDirectory;

      this.baseTemplateData = this.buildBaseTemplateData(
        this.baseConfig,
        this.styles
      );

      this.templateGenerator = new TemplateGenerator(this.baseTemplateData);

      if (this.renderAmpPages) {
        this.ampGenerator = new AmpGenerator(
          this.baseSourceDirectory,
          this.baseDestDirectory,
          this.layoutsDirectory
        );
      }

      this.initialized = true;
    }
  }

  public async render(sourceDirectory: string, destDirectory: string) {
    this.initialize(sourceDirectory, destDirectory);

    let sourceDirectoryConfig = loadConfigFile(sourceDirectory);
    let currentConfig = Object.assign(sourceDirectoryConfig, this.baseConfig);

    // TODO: Make this configurable
    // TODO: Cache these compile templates b/c we are doing this in every directory
    const applyTemplate = this.initializeTemplate(
      path.join(this.layoutsDirectory, this.defaultPageLayout)
    );

    const pages: Array<interfaces.IPageConfig> = [];
    const sourceDirectoryFileNames = fs.readdirSync(sourceDirectory);
    const contentFileNames = sourceDirectoryFileNames.filter(
      f =>
        !f.startsWith("_") &&
        !fs.lstatSync(path.join(sourceDirectory, f)).isDirectory() &&
        this.contentExtensionsToInclude.includes(path.extname(f).substr(1))
    );

    for (let currentFileName of contentFileNames) {
      const contentFile = this.readContentFile(
        path.join(sourceDirectory, currentFileName)
      );

      const { pageConfig, templateData } = this.renderContentFile(
        currentFileName,
        contentFile,
        applyTemplate,
        currentConfig,
        destDirectory
      );

      if (this.renderAmpPages && this.ampGenerator) {
        try {
        await this.ampGenerator.render(pageConfig, templateData);
        } catch (err){
          console.error(`Error generating AMP file for '${currentFileName}' - ${err}`)
        }
      }

      // templateData contains the content we don't want this to stay in memory
      pages.push(pageConfig);
    }

    // Traverse subdirectories and render pages
    const subDirectoryNames = sourceDirectoryFileNames.filter(f => {
      return fs.statSync(path.join(sourceDirectory, f)).isDirectory();
    });

    for (let subDirectoryName of subDirectoryNames) {
      const subDirectorySource = path.join(sourceDirectory, subDirectoryName);
      const subDirectoryDest = path.join(destDirectory, subDirectoryName);
      const subContent = await this.render(subDirectorySource, subDirectoryDest);
      pages.push(...subContent);
    }

    // Generate any template pages in the source directory using pages from current and all subdirectories
    if (this.templateGenerator) {
      this.templateGenerator.render(
        sourceDirectory,
        destDirectory,
        currentConfig,
        pages
      );
    }

    return pages;
  }

  private renderContentFile(
    currentFileName: string,
    content: interfaces.IContentSource,
    applyTemplate: handlebars.TemplateDelegate<any>,
    currentConfig: interfaces.IConfig,
    destDirectory: string
  ) {
    const pageConfig: interfaces.IPageConfig = Object.assign(
      {
        filename: currentFileName
      },
      currentConfig,
      content.data // front-mater,
    );

    if (!pageConfig.slug && pageConfig.permalink) {
      // Honor "permalink" alias for slug
      pageConfig.slug = pageConfig.permalink;
    }

    if (!pageConfig.date || !pageConfig.slug) {
      // date or slug is not specified so determine from filename
      const fileNameMatcher = currentFileName.match(
        /(\d{4}-\d{2}-\d{2})?[_|-]?(.*).md/
      );
      if (fileNameMatcher != null) {
        if (!pageConfig.date) {
          pageConfig.date = fileNameMatcher[1];
        }

        if (!pageConfig.slug) {
          pageConfig.slug = fileNameMatcher[2];
        }
      }
    }

    if (!pageConfig.title) {
      // If page title not available use file name slug
      pageConfig.title = pageConfig.slug;
    }

    if (pageConfig.date) {
      pageConfig.year = pageConfig.date.substr(0, 4);
    }

    const destDirectorRelativeToBase = destDirectory
      .replace(this.baseDestDirectory, "")
      .replace(/^\//, "");

    // TODO: Make path slug name configurable
    const relativeDestinationPath = path.join(
      destDirectorRelativeToBase,
      currentConfig.base_path || "",
      pageConfig.slug
    );
    pageConfig.path = relativeDestinationPath;

    if (this.renderAmpPages) {
      pageConfig.path_amp = pageConfig.path + "/amp.html";
    }

    // Apply template
    const templateData = Object.assign(
      <interfaces.ITemplateData>{},
      this.baseTemplateData,
      pageConfig,
      { content: content.html }
    );

    let templatedOutput = applyTemplate(templateData);
    if (this.prettyHtml) {
      templatedOutput = pretty(templatedOutput, { ocd: true });
    }

    // Write file
    const destunationPath = path.join(
      this.baseDestDirectory,
      relativeDestinationPath
    );
    fse.emptyDirSync(destunationPath);
    fs.writeFileSync(
      path.join(destunationPath, this.contentPageName),
      templatedOutput
    );

    return { pageConfig, templateData };
  }

  private readContentFile(filePath: string): interfaces.IContentSource {
    const source = fs.readFileSync(filePath, { encoding: "utf-8" });

    const parsedMatter = matter(source);
    const data = parsedMatter.data as interfaces.IFrontMatter;
    let html = "";

    const fileExtension = path.extname(filePath).substr(1);
    switch (fileExtension) {
      case "md":
        // Parse markdown
        html = marked(parsedMatter.content, {
          smartypants: true,
          highlight: this.codeHighlight ? this.prismHighlighter : undefined,
          renderer: this.markedRender
        });
        break;
      default:
        throw new Error(`File extension not support: ${fileExtension}`);
    }

    // Extract exceprt as first <p/> if not already specified
    if (!data.excerpt) {
      const indexOfFirstParagraph = html.indexOf("<p>");
      if (indexOfFirstParagraph > -1) {
        const indexOfEndOfFirstParagraph = html.indexOf(
          "</p>",
          indexOfFirstParagraph
        );
        if (indexOfEndOfFirstParagraph > -1) {
          data.excerpt = html.substring(
            indexOfFirstParagraph + 3,
            indexOfEndOfFirstParagraph
          );
        }
      }
    }

    return {
      data,
      html
    };
  }

  private prismHighlighter(code: string, lang: string) {
    // Translate aliases
    if (lang == "shell") {
      lang = "bash";
    }

    if (!prismjs.languages[lang]) {
      try {
        require("prismjs/components/prism-" + lang + ".js");
      } catch (err) {
        console.error(`Unable to load Prism language: '${lang}' - ${err}`);
      }
    }
    return prismjs.highlight(
      code,
      prismjs.languages[lang] || prismjs.languages.markup,
      ""
    );
  }

  private getMarkedRender() {
    const renderer = new marked.Renderer();
    renderer.code = function(code: string, language: string) {
      const options = (<any>this).options;
      var lang = (language || "markup").match(/\S*/)![0];
      if (options.highlight) {
        var out = options.highlight(code, lang);
        if (out != null && out !== code) {
          code = out;
        }
      }

      const className = options.langPrefix + lang;
      return `<pre class="${className}"><code class="${className}">${code}</code></pre>`;
    };
    return renderer;
  }

  private registerTemplatePartials(layoutsDirectory: string) {
    // TODO: support partials in subdirectories
    const templatePartialsFiles = fs
      .readdirSync(layoutsDirectory)
      .filter(f => f.endsWith(".hbs"));

    for (let fileName of templatePartialsFiles) {
      const templateContent = fs.readFileSync(
        path.join(layoutsDirectory, fileName),
        { encoding: "utf-8" }
      );

      let templateName = path.parse(fileName).name;
      if (templateName.startsWith("_")) {
        templateName = templateName.substr(1);
      }
      handlebars.registerPartial(templateName, templateContent);
    }
  }

  private buildBaseTemplateData(
    config: interfaces.IConfig,
    stylesList: Array<interfaces.IStyle>
  ) {
    // Structure styles as object (i.e. styles.default.content)
    const styles: {
      [partialName: string]: interfaces.IStyle;
    } = stylesList.reduce(
      (
        root: { [partialName: string]: interfaces.IStyle },
        current: interfaces.IStyle
      ) => {
        root[current.name] = current;
        return root;
      },
      {} as { [partialName: string]: interfaces.IStyle }
    );

    const templateData = Object.assign(<interfaces.ITemplateData>{}, config, {
      styles
    });

    return templateData;
  }

  private initializeTemplate(templateFile: string) {
    const templateContent = fs.readFileSync(templateFile, {
      encoding: "utf-8"
    });
    const applyTemplate = handlebars.compile(templateContent);
    return applyTemplate;
  }
}
