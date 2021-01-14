import AnalyzerException from "./AnalyzerException";
import LexerToken from "./LexerToken";
import Nullable from "./Nullable";
import LineScanner from "./Scanner";
import Token from "./Token";
import TokenType from "./TokenType";

export class Lexer {
  // Order matters! 😰
  private regex: Record<TokenType, string> = {
    [TokenType.BLOCK_COMMENT]: "(/\\*.*?\\*/).*",
    [TokenType.BLOCK_COMMENT_UNTERMINATED]: "(/\\*.*?).*",
    [TokenType.LINE_COMMENT]: "(//(.*?)[\r$]?\n).*",
    [TokenType.WHITE_SPACE]: "( ).*",
    [TokenType.OPENING_BRACE]: "(\\().*",
    [TokenType.CLOSING_BRACE]: "(\\)).*",
    [TokenType.SEMICOLON]: "(;).*",
    [TokenType.COLON]: "(:).*",
    [TokenType.COMMA]: "(,).*",
    [TokenType.OPENING_CURLY_BRACE]: "(\\{).*",
    [TokenType.CLOSING_CURLY_BRACE]: "(\\}).*",
    [TokenType.SCIENTIFIC_LITERAL]: "\\b([+\\-]?(?:0|[1-9]\\d*)(?:\\.\\d*)?(?:[eE][+\\-]?\\d+))\\b.*",
    [TokenType.OCTAL_LITERAL]: "\\b(0[0-7]+)\\b.*",
    // [TokenType.FLOAT_LITERAL]: "\\b(\\d{1,9}\\.\\d{1,16})\\b.*",
    [TokenType.DOUBLE_LITERAL]: "\\b(\\d{1,9}\\.\\d{1,32})\\b.*",
    [TokenType.INT_LITERAL]: "\\b(\\d{1,9})\\b.*",
    [TokenType.HEX_LITERAL]: "\\b(0[xX][0-9a-fA-F]+)\\b.*",
    [TokenType.BINARY_LITERAL]: "\\b(0[bB][01]+)\\b.*",
    [TokenType.VOID]: "\\b(void)\\b.*",
    [TokenType.INT]: "\\b(int)\\b.*",
    [TokenType.CHAR]: "\\b(char)\\b.*",
    [TokenType.STRING]: "\\b(string)\\b.*",
    [TokenType.DOUBLE]: "\\b(double)\\b.*",
    // [TokenType.FLOAT]: "\\b(float)\\b.*",
    [TokenType.BOOLEAN]: "\\b(boolean)\\b.*",
    [TokenType.TAB]: "(\\t).*",
    [TokenType.NEW_LINE]: "(\\n).*",
    [TokenType.PUBLIC]: "\\b(public)\\b.*",
    [TokenType.PRIVATE]: "\\b(private)\\b.*",
    [TokenType.FALSE]: "\\b(false)\\b.*",
    [TokenType.TRUE]: "\\b(true)\\b.*",
    [TokenType.NULL]: "\\b(null)\\b.*",
    [TokenType.RETURN]: "\\b(return)\\b.*",
    [TokenType.NEW]: "\\b(new)\\b.*",
    [TokenType.CLASS]: "\\b(class)\\b.*",
    [TokenType.IF]: "\\b(if)\\b.*",
    [TokenType.ELSE]: "\\b(else)\\b.*",
    [TokenType.WHILE]: "\\b(while)\\b.*",
    [TokenType.FOR]: "\\b(for)\\b.*",
    [TokenType.STATIC]: "\\b(static)\\b.*",
    [TokenType.POINT]: "(\\.).*",
    [TokenType.ADDITION]: "(\\+{1}).*",
    [TokenType.SUBTRACTION]: "(\\-{1}).*",
    [TokenType.MULTIPLICATION]: "(\\*).*",
    [TokenType.DIVISION]: "(/).*",
    [TokenType.EQUALS]: "(==).*",
    [TokenType.XOR]: "(\\^).*",
    [TokenType.ASSIGNMENT]: "(=).*",
    [TokenType.NOT_EQUALS]: "(\\!=).*",
    [TokenType.MORE]: "(>).*",
    [TokenType.LESS]: "(<).*",
    [TokenType.AND]: "(&&).*",
    [TokenType.OR]: "(\\|\\|).*",
    [TokenType.IDENTIFIER]: "\\b([a-zA-Z]{1}[0-9a-zA-Z_]{0,31})\\b.*",
    [TokenType.OPENING_SQUARE_BRACE]: "(\\[).*",
    [TokenType.CLOSING_SQUARE_BRACE]: "(\\]).*",
    [TokenType.VAR]: "\\b(var)\\b.*",
    [TokenType.FINAL]: "\\b(final)\\b.*",
    [TokenType.STRING_LITERAL]: '(\\"([^\\\\\\"]|\\\\.)*\\").*',
    [TokenType.MULTILINE_STRING_LITERAL]: '(\\"\\"\\"([^\\\\\\"]|\\\\.)*\\"\\"\\").*',
    [TokenType.CHAR_LITERAL]: "('(.{1}|\\\\n|\\\\t)').*",
  };

  private result: LexerToken[] = [];

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
    for (const [type, regex] of Object.entries(this.regex)) {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const pattern = new RegExp(`^${regex}$`, "s");
      const match = source.slice(from).match(pattern);
      if (match) {
        if (type === TokenType.BLOCK_COMMENT_UNTERMINATED) {
          return null;
        }
        const literal = match[1];
        const line = this.getLineNumber(source, from);
        const position = this.getPositionInLine(source, line, from);
        return new LexerToken(from + literal.length, literal, type as TokenType, line, position);
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
}

export default Lexer;
