// Config found in _config.yml files
export interface IConfig {
  site_title: string;
  site_description: string;
  site_url: string;
  site_author: string;
  base_path?: string;
  redirects: { [source: string]: string };
}

// Config found in .md front-matter
export interface IFrontMatter {
  title: string;
  description: string;
  date: string;
  year: string;
  path: string;
  slug: string;
  type: string;
  excerpt: string;

  permalink?: string; // alias for "slug"
}

// Config combined with front matter
export interface IPageConfig extends IConfig, IFrontMatter {
  filename: string;
  path_amp?: string;  
}

// Config that gets passed into the compiled template
export interface ITemplateData extends IPageConfig {
  styles?: { [partialName: string]: IStyle };
  content?: string;
}

export interface IContentSource {
  data: IFrontMatter;
  html: string;  
}

export interface IStyle {
  name: string;
  content: string;
}
