import Nullable from "./Nullable";
import WordStateFactory, { WordState } from "./WordState";

const WordState = WordStateFactory();

export class AnalyzerException extends Error {
  public message: string;

  constructor(source: string, position: number) {
    super(source);

    const substring = source
      .slice(position - this.getStartOffsetIndex(source, position), position + this.getEndOffsetIndex(source, position))
      .trim();

    this.message = `You have an error in your syntax near ${substring}`;
  }

  private getStartOffsetIndex(source: string, position: number): number {
    let index = 0;
    let state: Nullable<WordState> = WordState.INITIAL;

    while (position - index !== 0 && state?.whitespaces !== WordState.WORD_LIMIT && state !== WordState.NEWLINE) {
      index++;

      const char = source.charAt(position + index);
      const property = state?.next(char);

      if (property) {
        state = WordState[property];
      }
    }

    WordState.reset();

    return index;
  }

  private getEndOffsetIndex(source: string, position: number): number {
    let index = 0;
    let state = WordState.INITIAL;

    while (
      position + index !== source.length - 1 &&
      state.whitespaces !== WordState.WORD_LIMIT &&
      state !== WordState.NEWLINE
    ) {
      index++;

      const char = source.charAt(position + index);
      const property = state?.next(char);

      if (property) {
        state = WordState[property];
      }
    }

    WordState.reset();

    return index;
  }
}
