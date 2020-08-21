import TokenType, { isTokenAuxiliary } from "./TokenType";

export default class Token {
  constructor(
    private to: number,
    private literal: string,
    private type: TokenType,
    private line: number,
    private position: number
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
