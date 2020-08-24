import Nullable from "./Nullable";
import WordStateFactory, { WordState } from "./WordState";

const WordState = WordStateFactory();

export class AnalyzerException extends Error {
  constructor(source: string, position: number) {
    super("");

    const substring = source
      .slice(
        position - AnalyzerException.getStartOffsetIndex(source, position),
        position + AnalyzerException.getEndOffsetIndex(source, position)
      )
      .trim();

    this.message = `You have an error in your syntax near ${substring}`;
  }

  private static getStartOffsetIndex(source: string, position: number): number {
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

  private static getEndOffsetIndex(source: string, position: number): number {
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
