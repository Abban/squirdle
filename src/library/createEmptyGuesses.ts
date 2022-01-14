import {Guess, LETTER_STATE} from "@/entities/Guess";

const createDefaultLetters = (count: Number): Array<string> => {
    const defaultLetters = [];
    for (let i = 0; i < count; i++) {
        defaultLetters.push(LETTER_STATE.UNSET);
    }
    return defaultLetters;
}

const createEmptyGuesses = (guessCount: Number, letterCount: Number): Array<Guess> => {
    const emptyGuesses = [];
    for (let i = 0; i < guessCount; i++) {
        emptyGuesses.push({
            submitted: false,
            valid: true,
            correct: false,
            word: '',
            letterStates: createDefaultLetters(letterCount)
        });
    }

    return emptyGuesses;
}

export default createEmptyGuesses;