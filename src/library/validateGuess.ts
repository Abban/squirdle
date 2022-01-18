import {Guess, LETTER_STATE} from "@/entities/Guess";

function markCorrect(guessLetters: string[], availableLetters: string[], word: string, guess: any) {
    for (let i = 0; i < guessLetters.length; i++) {
        const availableLetterIndex = availableLetters.indexOf(guessLetters[i]);

        // Letter is in word and in correct position
        if (word.substr(i, 1) === guessLetters[i]) {
            guess.letterStates[i] = LETTER_STATE.CORRECT;
            availableLetters.splice(availableLetterIndex, 1);
        }
    }
}

function markAbsent(guessLetters: string[], availableLetters: string[], guess: any) {
    for (let i = 0; i < guessLetters.length; i++) {
        if (guess.letterStates[i] !== LETTER_STATE.FILLED) continue;

        if (availableLetters.indexOf(guessLetters[i]) === -1) {
            // Letter isn't in word
            guess.letterStates[i] = LETTER_STATE.ABSENT;
        }
    }
}

function markPresent(guessLetters: string[], availableLetters: string[], guess: any) {
    for (let i = 0; i < guessLetters.length; i++) {
        if (guess.letterStates[i] !== LETTER_STATE.FILLED) continue;

        const availableLetterIndex = availableLetters.indexOf(guessLetters[i]);

        if (availableLetterIndex !== -1) {
            guess.letterStates[i] = LETTER_STATE.PRESENT;
            availableLetters.splice(availableLetterIndex, 1);
        }
    }
}

const validateGuess = (guess: any|Guess, word: string): void => {
    const availableLetters = word.split('');
    const guessLetters = guess.word.split('');

    markCorrect(guessLetters, availableLetters, word, guess);
    markPresent(guessLetters, availableLetters, guess);
    markAbsent(guessLetters, availableLetters, guess);

    if (guess.word === word) {
        guess.correct = true;
    }
}

export default validateGuess;