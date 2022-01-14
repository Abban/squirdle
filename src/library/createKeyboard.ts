import {Key, KEY_STATE, KeyboardRow} from "@/entities/Key";

const createKey = (character: string): Key => {
    return {
        character: character,
        state: KEY_STATE.UNUSED
    }
}

const createKeyboardRow = (characters: Array<string>): KeyboardRow => {
    const keys: Array<Key> = [];
    characters.forEach(character => {
        keys.push(createKey(character));
    })
    return {keys};
}

const createKeyboard = (keyboardRows: Array<Array<string>>): Array<KeyboardRow> => {
    const keyboard: Array<KeyboardRow> = [];
    keyboardRows.forEach(row => {
        keyboard.push(createKeyboardRow(row));
    });
    return keyboard;
}

export default createKeyboard;