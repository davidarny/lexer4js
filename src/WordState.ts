import Closable from "./Closable";
import Nullable from "./Nullable";

export enum StateType {
  INITIAL = "INITIAL",
  WORD_BOUND = "WORD_BOUND",
  NO_BOUND = "NO_BOUND",
  NEWLINE = "NEWLINE",
}

export interface WordState extends Closable {
  whitespaces: number;

  next(char: string): Nullable<StateType>;
}

interface FactoryReturnType {
  WORD_LIMIT: number;

  INITIAL: WordState;
  WORD_BOUND: WordState;
  NO_BOUND: WordState;
  NEWLINE: WordState;

  reset(): void;
}

export function WordStateFactory(): FactoryReturnType {
  const WORD_LIMIT = 5;

  let whitespaces = 0;

  class InitialState implements WordState, Closable {
    get whitespaces() {
      return whitespaces;
    }

    next(char: string): Nullable<StateType> {
      return char === "\n" ? StateType.NEWLINE : StateType.WORD_BOUND;
    }

    close(): void {
      whitespaces = 0;
    }
  }

  class WordBoundState implements WordState, Closable {
    get whitespaces() {
      return whitespaces;
    }

    next(char: string): Nullable<StateType> {
      // prettier-ignore
      const next = char !== " " ? StateType.NO_BOUND : StateType.WORD_BOUND;
      return char === "\n" ? StateType.NEWLINE : next;
    }

    close(): void {
      whitespaces = 0;
    }
  }

  class NoBoundState implements WordState, Closable {
    get whitespaces() {
      return whitespaces;
    }

    next(char: string): Nullable<StateType> {
      if (char === "\n") {
        return StateType.NEWLINE;
      }
      if (char === " ") {
        whitespaces++;
        return StateType.WORD_BOUND;
      }
      return StateType.NO_BOUND;
    }

    close(): void {
      whitespaces = 0;
    }
  }

  class NewLineState implements WordState, Closable {
    get whitespaces() {
      return whitespaces;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next(_char: string): Nullable<StateType> {
      return null;
    }

    close(): void {
      whitespaces = 0;
    }
  }

  const states = {
    INITIAL: new InitialState(),
    WORD_BOUND: new WordBoundState(),
    NO_BOUND: new NoBoundState(),
    NEWLINE: new NewLineState(),
  };

  function reset() {
    Object.keys(states).forEach((key: unknown) => {
      const property = key as keyof typeof states;
      const state = states[property];
      state.close();
    });
  }

  return {
    ...states,
    WORD_LIMIT,
    reset,
  };
}

export default WordStateFactory;
