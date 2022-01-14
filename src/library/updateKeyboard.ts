import {KEY_STATE, KeyboardRow} from "@/entities/Key";

const updateKeyState = (keyboard: Array<KeyboardRow>, character: string, word: string) => {
    for (let i = 0; i < keyboard.length; i++ ) {
        const key = keyboard[i].keys.find(key => key.character === character);
        if(!key) continue;
        key.state = word.indexOf(character) >= 0 ? KEY_STATE.PRESENT : KEY_STATE.ABSENT;
        break;
    }
}

const updateKeyboard = (keyboard: Array<KeyboardRow>, guess: string, word: string): void => {
    const guessLetters = guess.split('');
    guessLetters.forEach((character: string) => {
        updateKeyState(keyboard, character, word);
    });
}

export default updateKeyboard;