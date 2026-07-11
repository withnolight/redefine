const fs = require("node:fs");
const path = require("node:path");

const content = process.argv.slice(2).join(" ").trim();

if (!content) {
  console.error('用法: npm run essay -- "今天的碎碎念"');
  process.exit(1);
}

const parts = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
}).formatToParts(new Date());

const value = (type) => parts.find((part) => part.type === type).value;
const date = `${value("year")}-${value("month")}-${value("day")} ${value("hour")}:${value("minute")}:${value("second")}`;
const indentedContent = content
  .split(/\r?\n/)
  .map((line) => `    ${line}`)
  .join("\n");
const entry = `- date: ${date}\n  content: |\n${indentedContent}\n\n`;
const essaysPath = path.join(__dirname, "..", "source", "_data", "essays.yml");
const existing = fs.existsSync(essaysPath) ? fs.readFileSync(essaysPath, "utf8") : "";

fs.mkdirSync(path.dirname(essaysPath), { recursive: true });
fs.writeFileSync(essaysPath, entry + existing);

console.log(`已添加碎碎念（${date}）`);
