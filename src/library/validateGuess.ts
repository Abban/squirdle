import {Guess, LETTER_STATE} from "@/entities/Guess";

const validateGuess = (guess: any|Guess, word: string): void => {
    const availableLetters = word.split('');
    const guessLetters = guess.word.split('');

    for (let i = 0; i < guessLetters.length; i++) {
        const availableLetterIndex = availableLetters.indexOf(guessLetters[i]);

        // Letter isn't in word
        if (availableLetterIndex === -1) {
            guess.letterStates[i] = LETTER_STATE.ABSENT;
            continue;
        }

        // Letter is in word and in correct position
        if (word.substr(i, 1) === guessLetters[i]) {
            guess.letterStates[i] = LETTER_STATE.CORRECT;
            availableLetters.splice(availableLetterIndex, 1);
            continue;
        }

        // Letter is in word but not in correct position
        guess.letterStates[i] = LETTER_STATE.PRESENT;
        availableLetters.splice(availableLetterIndex, 1);
    }

    if (guess.word === word) {
        guess.correct = true;
    }
}

export default validateGuess;