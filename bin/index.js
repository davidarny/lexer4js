/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs");
const chalk = require("chalk");
const { Lexer } = require("../dist");

const arguments_ = process.argv.splice(2);

if (arguments_.length === 0) {
  console.error(`
    ${chalk.gray("Usage: ")}

    ${chalk.yellowBright("$")} ${chalk.yellow("lexer4js test.ts")}
`);
  return;
}

const path = arguments_[0];

try {
  const text = fs.readFileSync(path, "utf8");

  const lexer = new Lexer();
  const tokens = lexer.tokenize(text);

  for (const token of tokens) {
    console.log(token.toString());
  }
} catch (error) {
  console.error(chalk.red(error));
}
