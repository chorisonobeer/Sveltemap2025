// bin/config.js
import fs from 'fs';
import YAML from 'yaml';
import path from 'path';

const srcConfigFilePath = path.join(process.cwd(), "config.yml");
const distConfigFilePath = path.join(process.cwd(), "src", "lib", "config.json");

let yamlText;
try {
  yamlText = fs.readFileSync(srcConfigFilePath, "utf-8");
} catch (error) {
  console.error(`${srcConfigFilePath} が存在しません。`);
  process.exit(1);
}

let config;
try {
  config = YAML.parse(yamlText);
} catch (error) {
  console.error(`${srcConfigFilePath} は正しい YAML 形式ではありません。`);
  process.exit(2);
}

fs.writeFileSync(distConfigFilePath, JSON.stringify(config, null, 2), "utf-8");

let envText = "";
Object.keys(config).forEach((key) => {
  if (typeof config[key] === "string") {
    envText += `VITE_${key.toUpperCase()}="${config[key]}"\n`;
  }
});
fs.writeFileSync(path.join(process.cwd(), ".env"), envText, "utf-8");

console.log("config.yml を読み込み、config.json と .env を生成しました。");
process.exit(0);
