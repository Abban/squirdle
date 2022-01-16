import {GameState, GAME_STATE} from "@/entities/GameState";
import createEmptyGuesses from "@/library/createEmptyGuesses";
import createKeyboard from "@/library/createKeyboard";

const ITEM_NAME = 'gameState';

const createGameState = (date: Number, guesses: Number, wordLength: Number, keys: Array<Array<string>>): GameState => {
    const gameState = {
        date: date,
        state: GAME_STATE.IN_PROGRESS,
        guesses: createEmptyGuesses(guesses, wordLength),
        guessIndex: 0,
        keyboard: createKeyboard(keys)
    };
    storeGameState(gameState);
    return gameState;
}

const getGameState = (date: Number, guesses: Number, wordLength: Number, keys: Array<Array<string>>): GameState => {
    const gameState = loadGameState();

    if (gameState && gameState.date === date) return gameState;

    return createGameState(date, guesses, wordLength, keys);
}

const loadGameState = (): GameState|null => {
    const gameStateString = localStorage.getItem(ITEM_NAME);
    if(gameStateString === null) return null;
    return JSON.parse(gameStateString);
}

const storeGameState = (gameState: GameState): void => {
    localStorage.setItem(ITEM_NAME, JSON.stringify(gameState));
}

export default {
    storeGameState,
    getGameState
};