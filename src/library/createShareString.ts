import {GameState} from "@/entities/GameState";
import {LETTER_STATE} from "@/entities/Guess";

const createShareString = (gameState: GameState, puzzleNumber: Number, caught: Number, total: Number): String => {
    let string = `Squirdle day ${puzzleNumber}. ${gameState?.guessIndex}/${gameState?.guesses.length} \n`;
    for(let i = 0; i < gameState?.guessIndex; i++) {
        gameState?.guesses[i].letterStates.forEach((letterState: string) => {
            switch (letterState) {
                case LETTER_STATE.CORRECT:
                    string += '🟢';
                    break;
                case LETTER_STATE.PRESENT:
                    string += '🟡';
                    break;
                default:
                    string += '⚫';
            }
        });
        string += '\n';
    }
    string += `I've caught ${caught}/${total}`
    return string;
}

export default createShareString;