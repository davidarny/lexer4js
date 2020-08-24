export default class LineScanner {
  private position = 0;
  private lines: string[] = [];

  constructor(source: string) {
    this.lines = source.split("\n");
  }

  hasNextLine(): boolean {
    return this.position < this.lines.length;
  }

  readNextLine(): string {
    return this.lines[this.position++];
  }
}
