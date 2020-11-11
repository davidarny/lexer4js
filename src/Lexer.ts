import { AnalyzerException } from "./AnalyzerException";
import LexerToken from "./LexerToken";
import Nullable from "./Nullable";
import LineScanner from "./Scanner";
import Token from "./Token";
import TokenType from "./TokenType";

export default class Lexer {
  private regex = new Map<TokenType, string>();
  private result: LexerToken[] = [];

  constructor() {
    this.fillTokenMap();
  }

  public tokenize(source: string): Token[] {
    let position = 0;
    let token: Nullable<LexerToken> = null;
    do {
      token = this.getNextToken(source, position);
      // eslint-disable-next-line security/detect-possible-timing-attacks
      if (token !== null) {
        position = token.endPosition;
        this.result.push(token);
      }
    } while (token !== null && position !== source.length);
    if (position !== source.length) {
      throw new AnalyzerException(source, position);
    }
    return this.getFilteredTokens();
  }

  private getFilteredTokens(): Token[] {
    return this.result.filter((token) => token.isNotAuxiliary);
  }

  private getNextToken(source: string, from: number): Nullable<LexerToken> {
    if (from < 0 || from >= source.length) {
      throw new Error("Illegal index in the input stream");
    }
    const tokens = (Object.keys(TokenType) as unknown) as TokenType[];
    for (const type of tokens) {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const pattern = new RegExp(`^${this.regex.get(type)}$`, "s");
      const match = source.slice(from).match(pattern);
      if (match) {
        if (type === TokenType.BLOCK_COMMENT_UNTERMINATED) {
          return null;
        }
        const literal = match[1];
        const line = this.getLineNumber(source, from);
        const position = this.getPositionInLine(source, line, from);
        return new LexerToken(from + literal.length, literal, type, line, position);
      }
    }
    return null;
  }

  private getLineNumber(source: string, from: number): number {
    return source.slice(0, from + 1).split("\n").length;
  }

  private getPositionInLine(source: string, line: number, from: number): number {
    const scanner = new LineScanner(source);
    let index = 0;
    let pos = from;
    while (scanner.hasNextLine() && index !== line - 1) {
      const skipped = scanner.readNextLine();
      pos -= skipped.length + 1;
      index++;
    }
    return pos;
  }

  private fillTokenMap(): void {
    this.regex.set(TokenType.BLOCK_COMMENT, "(/\\*.*?\\*/).*");
    this.regex.set(TokenType.BLOCK_COMMENT_UNTERMINATED, "(/\\*.*?).*");
    this.regex.set(TokenType.LINE_COMMENT, "(//(.*?)[\r$]?\n).*");
    this.regex.set(TokenType.WHITE_SPACE, "( ).*");
    this.regex.set(TokenType.OPENING_BRACE, "(\\().*");
    this.regex.set(TokenType.CLOSING_BRACE, "(\\)).*");
    this.regex.set(TokenType.SEMICOLON, "(;).*");
    this.regex.set(TokenType.COLON, "(:).*");
    this.regex.set(TokenType.COMMA, "(,).*");
    this.regex.set(TokenType.OPENING_CURLY_BRACE, "(\\{).*");
    this.regex.set(TokenType.CLOSING_CURLY_BRACE, "(\\}).*");
    this.regex.set(TokenType.SCIENTIFIC_LITERAL, "\\b([+\\-]?(?:0|[1-9]\\d*)(?:\\.\\d*)?(?:[eE][+\\-]?\\d+))\\b.*");
    this.regex.set(TokenType.OCTAL_LITERAL, "\\b(0[0-7]+)\\b.*");
    this.regex.set(TokenType.FLOAT_LITERAL, "\\b(\\d{1,9}\\.\\d{1,16})\\b.*");
    this.regex.set(TokenType.DOUBLE_LITERAL, "\\b(\\d{1,9}\\.\\d{1,32})\\b.*");
    this.regex.set(TokenType.INT_LITERAL, "\\b(\\d{1,9})\\b.*");
    this.regex.set(TokenType.HEX_LITERAL, "\\b(0[xX][0-9a-fA-F]+)\\b.*");
    this.regex.set(TokenType.BINARY_LITERAL, "\\b(0[bB][01]+)\\b.*");
    this.regex.set(TokenType.VOID, "\\b(void)\\b.*");
    this.regex.set(TokenType.INT, "\\b(int)\\b.*");
    this.regex.set(TokenType.DOUBLE, "\\b(double)\\b.*");
    this.regex.set(TokenType.FLOAT, "\\b(float)\\b.*");
    this.regex.set(TokenType.BOOLEAN, "\\b(boolean)\\b.*");
    this.regex.set(TokenType.TAB, "(\\t).*");
    this.regex.set(TokenType.NEW_LINE, "(\\n).*");
    this.regex.set(TokenType.PUBLIC, "\\b(public)\\b.*");
    this.regex.set(TokenType.PRIVATE, "\\b(private)\\b.*");
    this.regex.set(TokenType.FALSE, "\\b(false)\\b.*");
    this.regex.set(TokenType.TRUE, "\\b(true)\\b.*");
    this.regex.set(TokenType.NULL, "\\b(null)\\b.*");
    this.regex.set(TokenType.RETURN, "\\b(return)\\b.*");
    this.regex.set(TokenType.NEW, "\\b(new)\\b.*");
    this.regex.set(TokenType.CLASS, "\\b(class)\\b.*");
    this.regex.set(TokenType.IF, "\\b(if)\\b.*");
    this.regex.set(TokenType.ELSE, "\\b(else)\\b.*");
    this.regex.set(TokenType.WHILE, "\\b(while)\\b.*");
    this.regex.set(TokenType.FOR, "\\b(for)\\b.*");
    this.regex.set(TokenType.STATIC, "\\b(static)\\b.*");
    this.regex.set(TokenType.POINT, "(\\.).*");
    this.regex.set(TokenType.ADDITION, "(\\+{1}).*");
    this.regex.set(TokenType.SUBTRACTION, "(\\-{1}).*");
    this.regex.set(TokenType.MULTIPLICATION, "(\\*).*");
    this.regex.set(TokenType.DIVISION, "(/).*");
    this.regex.set(TokenType.EQUALS, "(==).*");
    this.regex.set(TokenType.XOR, "(\\^).*");
    this.regex.set(TokenType.ASSIGNMENT, "(=).*");
    this.regex.set(TokenType.NOT_EQUALS, "(\\!=).*");
    this.regex.set(TokenType.MORE, "(>).*");
    this.regex.set(TokenType.LESS, "(<).*");
    this.regex.set(TokenType.IDENTIFIER, "\\b([a-zA-Z]{1}[0-9a-zA-Z_]{0,31})\\b.*");
    this.regex.set(TokenType.OPENING_SQUARE_BRACE, "(\\[).*");
    this.regex.set(TokenType.CLOSING_SQUARE_BRACE, "(\\]).*");
    this.regex.set(TokenType.VAR, "\\b(var)\\b.*");
    this.regex.set(TokenType.FINAL, "\\b(final)\\b.*");
    this.regex.set(TokenType.STRING_LITERAL, '(\\"([^\\\\\\"]|\\\\.)*\\").*');
    this.regex.set(TokenType.MULTILINE_STRING_LITERAL, '(\\"\\"\\"([^\\\\\\"]|\\\\.)*\\"\\"\\").*');
    this.regex.set(TokenType.CHAR_LITERAL, "('(.{1}|\\\\n|\\\\t)').*");
  }
}
