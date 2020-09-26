import TokenType from "./TokenType";

export default interface Token {
  literal: string;
  type: TokenType;
  line: number;
  position: number;
}
