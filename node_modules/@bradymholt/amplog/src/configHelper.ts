import * as path from "path";
import * as fs from "fs";
import * as fse from "fs-extra";
import * as yaml from "js-yaml";
import { IConfig } from "./interfaces";

export function loadConfigFile(sourceDirectory: string) {
  const configFilePath = path.join(sourceDirectory, "_config.yml");
  if (fse.existsSync(configFilePath)) {
    const configFileContent = fs.readFileSync(
      path.join(sourceDirectory, "_config.yml"),
      "utf-8"
    );
    return yaml.safeLoad(configFileContent) as IConfig;
  } else {
    return {} as IConfig;
  }
}
