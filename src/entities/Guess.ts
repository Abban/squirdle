export const LETTER_STATE = Object.freeze({
    UNSET: 'UNSET',
    FILLED: 'FILLED',
    CORRECT: 'CORRECT',
    PRESENT: 'PRESENT',
    ABSENT: 'ABSENT'
});

export interface Guess {
    word: String,
    valid: Boolean,
    submitted: Boolean,
    correct: Boolean,
    letterStates: Array<string>,
}