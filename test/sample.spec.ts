import { Lexer } from "../src";

const fs = require("fs");

describe("Lexer", () => {
  const source = fs.readFileSync("test/actual.java", "utf8");
  const expected = fs.readFileSync("test/expected.txt", "utf8");

  it("should have same output as in expected.txt", () => {
    const lexer = new Lexer();
    const tokens = lexer.tokenize(source);
    const actual = tokens.map((token) => token.toString()).join("\n");

    expect(actual).toEqual(expected.trim());
  });
});
