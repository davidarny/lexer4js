import fs from "fs";

import { Lexer } from "../src";

describe("Lexer", () => {
  const source = fs.readFileSync("test/code.java", "utf8");

  it("should match snapshot", () => {
    const lexer = new Lexer();
    const tokens = lexer.tokenize(source);
    const actual = tokens.map((token) => token.toString()).join("\n");

    expect(actual).toMatchSnapshot();
  });
});
