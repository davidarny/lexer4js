import TokenType from "./TokenType";

export interface Token {
  literal: string;
  type: TokenType;
  line: number;
  position: number;
}

export default Token;
