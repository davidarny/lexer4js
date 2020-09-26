import Token from "./Token";
import TokenType, { isTokenAuxiliary } from "./TokenType";

export default class LexerToken implements Token {
  constructor(
    private to: number,
    public literal: string,
    public type: TokenType,
    public line: number,
    public position: number
  ) {}

  get endPosition(): number {
    return this.to;
  }

  get isNotAuxiliary(): boolean {
    return !isTokenAuxiliary(this.type);
  }

  toString(): string {
    if (this.isNotAuxiliary) {
      // prettier-ignore
      return this.type + " '" + this.literal.trim() + "' [L" + this.line + ":" + this.position + "]";
    }
    return this.type + " [L" + this.line + ":" + this.position + "]";
  }
}
