import {Guess} from "@/entities/Guess";
import {KeyboardRow} from "@/entities/Key";

export const GAME_STATE = Object.freeze({
    IN_PROGRESS: 'IN_PROGRESS',
    WON: 'WON',
    LOST: 'LOST',
});

export interface GameState {
    date: Number,
    state: string,
    guesses: Array<Guess>,
    guessIndex: number,
    keyboard: Array<KeyboardRow>
}